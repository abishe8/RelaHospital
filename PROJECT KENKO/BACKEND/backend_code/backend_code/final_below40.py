import random
import multiprocessing
import time
import subprocess
import sys
import logging

# Set up logging
logging.basicConfig(filename="patient_progress.log", level=logging.INFO,
                    format="%(asctime)s - %(message)s")

# Constants
CARDIOLOGY_TESTS = ["A", "B", "C"]
RADIOLOGY_TESTS = ["D", "E", "F"]
UNIQUE_TESTS = ["G", "H", "I", "J"]

TEST_DURATION = {
    "A": 15, "B": 15, "C": 20,
    "D": 15, "E": 15, "F": 20,
    "G": 35, "H": 30, "I": 40, "J": 45
}

VENUES = {
    "A": ["C1", "M1"], "B": ["C2", "M2"], "C": ["C3", "M2"],
    "D": ["r1"], "E": ["r2", "r3"], "F": ["r4"],
    "G": ["U1"], "H": ["U2"], "I": ["U3"], "J": ["U4"]
}

# Fisher-Yates shuffle algorithm
def fisher_yates_shuffle(arr):
    random.shuffle(arr)

# Generate timestamp
def generate_timestamp():
    return random.randint(0, 100)

# Check test availability and assign it if free
def allocate_test_if_available(patient, test, test_availability, test_locks):
    while not test_availability[test]:
        print(f"Patient ID: {patient['id']} - Waiting for test {test} to become available.")
        time.sleep(3)  # Wait and check again

    # Allocate test if available
    with test_locks[test]:
        test_availability[test] = False  # Mark test as unavailable
        return True

# Slave component: Manages each patient's test process
def patient_process(patient, test_availability, test_locks):
    logging.info(f"Process for Patient ID: {patient['id']} started.")

    # Take CARDIOLOGY and RADIOLOGY tests first
    for test, venue in zip(patient["tests"], patient["venues"]):
        allocate_test_if_available(patient, test, test_availability, test_locks)

        while True:
            with test_locks[test]:
                print(f"Patient ID: {patient['id']} - Test: {test}, Venue: {venue}")
                end_time = patient["timestamps"][test]["end"]
                print(f"End Time: {end_time}")
                
                response = input("Have you completed the test? (yes/no): ").lower()
                if response == "yes":
                    print(f"Test {test} completed for Patient ID: {patient['id']}!")
                    logging.info(f"Test {test} completed for Patient ID: {patient['id']}.")
                    patient['completed_tests'].append(test)  # Mark the test as completed
                    test_availability[test] = True  # Mark test as available again
                    time.sleep(TEST_DURATION[test])  # Simulate test duration
                    break
                else:
                    print("Please wait until you finish your test. Don’t forget to tap 'Yes' after completing the test to proceed.")
                    logging.info(f"Patient ID: {patient['id']} waiting for test {test}.")
                    time.sleep(3)  # Continue the process

    # After completing CARDIOLOGY and RADIOLOGY tests, proceed to UNIQUE tests
    if all(test in patient['completed_tests'] for test in CARDIOLOGY_TESTS + RADIOLOGY_TESTS):
        for unique_test, venue in zip(patient["unique_tests"], patient["unique_venues"]):
            allocate_test_if_available(patient, unique_test, test_availability, test_locks)

            while True:
                with test_locks[unique_test]:
                    print(f"Patient ID: {patient['id']} - Unique Test: {unique_test}, Venue: {venue}")
                    response = input(f"Have you completed the UNIQUE test {unique_test}? (yes/no): ").lower()
                    if response == "yes":
                        print(f"UNIQUE Test {unique_test} completed for Patient ID: {patient['id']}!")
                        logging.info(f"UNIQUE Test {unique_test} completed for Patient ID: {patient['id']}.")
                        test_availability[unique_test] = True  # Mark unique test as available again
                        time.sleep(TEST_DURATION[unique_test])  # Simulate test duration
                        break
                    else:
                        print("Please complete your unique test. Don’t forget to tap 'Yes' after completing the test to proceed.")
                        time.sleep(3)  # Continue the process

    print(f"All tests completed for Patient ID: {patient['id']}")
    logging.info(f"All tests completed for Patient ID: {patient['id']}.")

# Master component: Manages the scheduling of all patients
def allocate_tests_and_venues(patients):
    for patient in patients:
        test_set = CARDIOLOGY_TESTS + RADIOLOGY_TESTS
        fisher_yates_shuffle(test_set)  # Shuffle only CARDIOLOGY and RADIOLOGY tests
        patient["tests"] = test_set.copy()  # Assign shuffled tests
        patient["venues"] = []
        patient["timestamps"] = {test: {"end": None} for test in test_set}
        patient["waiting"] = False
        patient["completed_tests"] = []

        # Assign unique tests after CARDIOLOGY and RADIOLOGY
        unique_set = UNIQUE_TESTS.copy()
        patient["unique_tests"] = unique_set
        patient["unique_venues"] = [VENUES[unique_test][0] for unique_test in unique_set]

        # Allocate venues for the tests
        for test in patient["tests"]:
            venues = VENUES[test]
            random.shuffle(venues)
            selected_venue = next((v for v in venues if v not in patient["venues"]), None)
            if selected_venue:
                patient["venues"].append(selected_venue)

        for test in patient["tests"]:
            start_time = generate_timestamp()
            patient["timestamps"][test]["start"] = start_time
            patient["timestamps"][test]["end"] = start_time + TEST_DURATION[test]

# Generate patient data
def generate_patients(num_patients):
    return [{"id": i} for i in range(1, num_patients + 1)]

# Launch each slave process in a separate terminal
def launch_patient_process_in_terminal(patient, test_availability, test_locks):
    try:
        subprocess.Popen([
            "start", "cmd", "/k", "python", sys.argv[0], "slave", str(patient['id'])
        ], shell=True)
    except Exception as e:
        logging.error(f"Error launching process for Patient ID {patient['id']}: {e}")
        print(f"Error launching process for Patient ID {patient['id']}: {e}")

# Function to run the slave in the current process (when called from a new terminal)
def run_patient_slave(patient_id, test_availability, test_locks):
    patients = generate_patients(4)  # Example: generating patients again for testing purposes
    patient = patients[patient_id - 1]  # Find the correct patient
    allocate_tests_and_venues([patient])
    patient_process(patient, test_availability, test_locks)

# Main function to simulate patient allocation
def simulate_patient_allocation():
    try:
        num_patients = int(input("Enter the number of patients: "))
        patients = generate_patients(num_patients)

        test_availability = multiprocessing.Manager().dict({test: True for test in CARDIOLOGY_TESTS + RADIOLOGY_TESTS + UNIQUE_TESTS})
        test_locks = {test: multiprocessing.Lock() for test in CARDIOLOGY_TESTS + RADIOLOGY_TESTS + UNIQUE_TESTS}

        allocate_tests_and_venues(patients)

        processes = []
        for patient in patients:
            p = multiprocessing.Process(target=launch_patient_process_in_terminal, args=(patient, test_availability, test_locks))
            processes.append(p)
            p.start()

        for p in processes:
            p.join()

    except ValueError:
        print("Please enter a valid number for the number of patients.")
    except Exception as e:
        logging.error(f"Error in simulate_patient_allocation: {e}")
        print(f"Error in simulate_patient_allocation: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "slave":
        # This is a slave process running in a new terminal
        patient_id = int(sys.argv[2])
        test_availability = multiprocessing.Manager().dict({test: True for test in CARDIOLOGY_TESTS + RADIOLOGY_TESTS + UNIQUE_TESTS})
        test_locks = {test: multiprocessing.Lock() for test in CARDIOLOGY_TESTS + RADIOLOGY_TESTS + UNIQUE_TESTS}
        run_patient_slave(patient_id, test_availability, test_locks)
    else:
        # This is the main process
        simulate_patient_allocation()
