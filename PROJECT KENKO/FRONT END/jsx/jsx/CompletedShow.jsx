import React from "react";
import "../css/completedshow.css";
import { useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
const CompletedShow = () => {
  const navigate = useNavigate();

  function createConfetti() {
    const confettiCount = 1000; // Increase the number of confetti pieces for a denser effect
    const confettiContainer = document.getElementById("confetti");

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      confetti.style.top = `${Math.random() * -100 - i * 10}px`;
      confetti.style.animationDuration = `${Math.random() * 1 + 1}s`; // Random duration between 2s and 5s
      confetti.style.opacity = Math.random(); // Random opacity
      confetti.style.width = `${Math.random() * 15 + 5}px`; // Random width between 5px and 20px
      confetti.style.height = `${Math.random() * 15 + 10}px`; // Random height between 10px and 25px
      confettiContainer.appendChild(confetti);
      // Remove confetti after animation ends
      confetti.addEventListener("animationend", () => {
        confettiContainer.removeChild(confetti);
      });
    }
  }

  function getRandomColor() {
    const colors = ["#FF0B0B", "#FF8F00", "#A1D600", "#00C8FF", "#FF3D00"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  setTimeout(() => {
    createConfetti();
  }, 1000);

  setTimeout(() => {
    navigate("/loader");
  }, 4000);
  return (
    <div id="confetti">
      <section className="completed">
        <MdCheckCircle size={100} color="#87CEEB" />
        <h3>
          Successfully completed all tests!</h3>
      </section>
    </div>
  );
};

export default CompletedShow;
