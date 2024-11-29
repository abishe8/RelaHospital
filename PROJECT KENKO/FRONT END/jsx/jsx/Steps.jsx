import React, { useRef, useEffect, useState } from "react";
import "../css/Steps.css";
import products from "../db";
import Loader from "./Loader";
import "../css/popup.css";
import "../css/nopopup.css";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaXmark } from "react-icons/fa6"; 

// to draw canvas line 
let valus;
const Steps = () => {
  const canvasRef = useRef(null);
  const drawWavyLine = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const amplitude = 50; // Get amplitude  value 
    const canvasHeight = valus; // Get canvas height value
    const lineThickness = 25; // Get line thickness value
    const frequency = 0.01; //0.015 Get wave frequency value

    canvas.height = canvasHeight;

    // Clear the previous wave
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gradient for the wavy line
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#F5E4C3");
    gradient.addColorStop(1, "#8B5D0C");

    // Style for the line
    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineThickness; // Set the line thickness dynamically

    // Begin drawing the wavy line
    ctx.beginPath();
    for (let y = 0; y <= canvas.height; y++) {
      let x = 100 + Math.sin(y * frequency) * amplitude; // 100 centers the wave
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Mark peaks and place text at those points
    ctx.fillStyle = "red"; // Color for the peak markers
    ctx.font = "16px Arial"; // Font for the text
    ctx.textAlign = "center"; // Center the text

    for (let y = 0; y <= canvas.height; y++) {
      let x = 100 + Math.sin(y * frequency) * amplitude; // Calculate x position
      if (Math.abs(Math.sin(y * frequency)) === 1) {
        // Check if it's a peak (1 or -1)
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, false); // Draw a circle for the peak
        ctx.fill(); // Fill the circle

        // Draw the title at peak
        ctx.fillText("Blood Count", x, y - 10); // Adjust vertical position as needed
      }
    }
  };
  // Initial rendering effect to draw the line
  useEffect(() => {
    drawWavyLine();
  }, []); // Draw only once on initial render

  // to set Number of Test
  const [lengthchecker, setlengthchecker] = useState(5);
  const [statelength, setstatelength] = useState(lengthchecker);

  // State to control loader visibility
  const [showLoader, setShowLoader] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  const [target, settarget] = useState(null);
  const [indexValue, setindexValue] = useState(null);
  const [showpopup, hidepopup] = useState(false);
  const [nobtnpopup, setnobtnpopup] = useState(false);
  const [pageScroll, setpageScroll] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false); // Hide loader
        setShowMainContent(true); // Show main content
    }, 3000); // 3000 milliseconds delay

    // Cleanup function
    return () => clearTimeout(timer);
  }, []);

  function access() {
    products.forEach((el) => {
      if (el.testNO === statelength) {
        valus = el.length;
      }
    });
  }

  access();

  function handleMouseenter(e) {
    if (
      e.target.value == 29 ||
      e.target.parentElement.parentElement.value === 29 ||
      e.target.parentElement.value === 29
    ) {
      setTimeout(()=>{
        hidepopup(true);
      },500)
      settarget(e);
      setpageScroll(true);
    } else if (
      (e.target.nextElementSibling &&
        e.target.nextElementSibling.children[2]?.className ===
          "checkboxshow") ||
      (e.target.parentElement.nextElementSibling &&
        e.target.parentElement.nextElementSibling.children[2]?.className ===
          "checkboxshow") ||
      (e.target.parentElement.parentElement.nextElementSibling.children[2] &&
        e.target.parentElement.parentElement.nextElementSibling.children[2]
          .className === "checkboxshow")
    ) {
      setTimeout(()=>{
        hidepopup(true);
      },500)
 
      settarget(e);
      setpageScroll(true);
    }
  }

  function handleYes() {
    let e = target;

    if (e.target.tagName === "LI") {
     
      e.target.children[2].className = "checkboxshow";
      e.target.classList.add("disabled");
      e.target.previousElementSibling
        ? (e.target.previousElementSibling.className = "list__lastElement")
        : null;
      e.target.previousElementSibling &&
      e.target.previousElementSibling.children[1]
        ? (e.target.previousElementSibling.children[1].className =
            "circle__lastInnertext")
        : null;
        window.scrollBy({
          top: -400, // Scroll up by 100 pixels
          behavior: 'smooth' // Smooth scroll effect
      });
    } else if (e.target.tagName === "IMG") {
      e.target.parentElement.children[2].className = "checkboxshow";
      e.target.parentElement
        ? e.target.parentElement.classList.add("disabled")
        : null;
      e.target.parentElement.previousElementSibling
        ? (e.target.parentElement.previousElementSibling.className =
            "list__lastElement")
        : null;
      e.target.parentElement.previousElementSibling &&
      e.target.parentElement.previousElementSibling.children[1]
        ? (e.target.parentElement.previousElementSibling.children[1].className =
            "circle__lastInnertext")
        : null;
        window.scrollBy({
          top: -400, // Scroll up by 100 pixels
          behavior: 'smooth' // Smooth scroll effect
      });
    } else if (e.target.tagName === "H4") {
      e.target.parentElement.nextElementSibling.className = "checkboxshow";
      e.target.parentElement.parentElement
        ? e.target.parentElement.parentElement.classList.add("disabled")
        : null;
      e.target.parentElement.parentElement.previousElementSibling
        ? (e.target.parentElement.parentElement.previousElementSibling.className =
            "list__lastElement")
        : null;
      e.target.parentElement.parentElement.previousElementSibling &&
      e.target.parentElement.parentElement.previousElementSibling.children[1]
        ? (e.target.parentElement.parentElement.previousElementSibling.children[1].className =
            "circle__lastInnertext")
        : null;
        window.scrollBy({
          top: -400, // Scroll up by 100 pixels
          behavior: 'smooth' // Smooth scroll effect
      });  
    }
    let counterAttcker = 0
    var completedAllSteps = document.querySelectorAll(".levels >ul>li>div:nth-child(3)")
    let lengther = completedAllSteps.length
    completedAllSteps.forEach((el)=>{
             if(el.className === "checkboxshow"){
                counterAttcker+=1
             }
        
    })
    if(lengther == counterAttcker){
     setTimeout(()=>{
      navigate("/completed")   
     },2000)
    }
    hidepopup(false);
    setpageScroll(false);


  }

  function handleNo() {
    let e = target;
    if (e.target.tagName === "LI") {
      e.target.children[2].className = "checkboxhide";
    } else if (e.target.tagName === "IMG") {
      e.target.parentElement.children[2].className = "checkboxhide";
    } else if (e.target.tagName === "H4") {
      e.target.parentElement.parentElement.children[2].className =
        "checkboxhide";
    }

    hidepopup(false);
    setnobtnpopup(true);
    setpageScroll(true);
  }

  function handleGoBack() {
    setnobtnpopup(false);
    setpageScroll(false);
  }

  // page scroll

  //  document.body.style.overflow = showpopup ? "hidden" :"scroll"
  document.body.style.overflow = pageScroll ? "hidden" : "scroll";

  const footerRef = useRef(null);
  useEffect(() => {
    if (showMainContent && footerRef.current) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [showMainContent]);

  // footer style
  const footerStyle = {
    backgroundColor: "#1D0A4C",
    color: "#1D0A4C",
    textAlign: "center",
    position: "absolute",
    bottom: "0",
    left: "0",
  };






function createConfetti() {
  const confettiCount = 100; // Number of confetti pieces
  const confettiContainer = document.getElementById('confetti');

  for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      confetti.style.animationDuration = `${Math.random() * 1 + 1}s`; // Random duration between 1s and 2s
      confetti.style.opacity = Math.random(); // Random opacity
      confetti.style.width = `${Math.random() * 10 + 5}px`; // Random width between 5px and 15px
      confetti.style.height = `${Math.random() * 10 + 10}px`; // Random height between 10px and 20px
      confettiContainer.appendChild(confetti);

      // Remove confetti after animation ends
      confetti.addEventListener('animationend', () => {
          confettiContainer.removeChild(confetti);
      });
  }
}

// Generate random colors for the confetti
function getRandomColor() {
  const colors = ['#FF0B0B', '#FF8F00', '#A1D600', '#00C8FF', '#FF3D00', '#9C27B0'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const  [ initialpopup , setinitialpopup ] = useState(false)

useEffect(()=>{
setTimeout(() => {
  setinitialpopup(true);
}, 4000);

},[])

function handleContinue(){
             setinitialpopup(false);
}

  return (
    <div>
      {showLoader && <Loader style={{ overflow: "hidden", height: "100vh" }} />}
      <section
        className="steps"
        style={{ display: showMainContent ? "block" : "none" }}
      >
        <div
          className="canvapre"
          onClick={(e) => {
            handleMouseenter(e);
          }}
        >
          <canvas ref={canvasRef} width="200" height="400"></canvas>
          <div className="levels">
            <ul>
              {products.map((el, index) =>
                el.testNO <= lengthchecker ? (
                  <li
                    key={el.testNO || `item-${index}`}
                    className={
                      index === 29 ? "list__lastElement" : "list__elements"
                    }
                    value={index}
                  >
                    <img
                      width="60"
                      height="60"
                      src={`/assets/steps/${el.img}`}
                      alt=""
                    />
                    <div
                      className={
                        index === 29
                          ? "circle__lastInnertext"
                          : "circle__innerText"
                      }
                    >
                      <h4>{el.testName}</h4>
                      <h4>{el.venue}</h4>
                    </div>
                    <div className="checkboxhide" value={index}>
                      <FaCheckCircle
                        className="checkbox-wrapper"
                        style={{ color: "#28A745", fontSize: "30px" }}
                      />
                    </div>
                  </li>
                ) : null
              )}
            </ul>
          </div>
        </div>
        <section
          className="popup"
          style={{ display: showpopup ? "block" : "none" }}
        >
          <div className="popup-wrapper">
            <p>Did you Complete the test ?</p>
            <div>
              <button
                className="yesbtn"
                onClick={(e) => {
                  handleYes(e);
                }}
              >
                Yes
              </button>
              <button className="nobtn" onClick={handleNo}>
                No
              </button>
            </div>
          </div>
        </section>
        <section
          className="nopopup"
          style={{ display: nobtnpopup ? "block" : "none" }}
        >
          <div className="nopopup-wrapper">
            <p>
              Please wait until you finish your test. Don’t forget to tap 'Yes'
              after completing the test to proceed
            </p>
            <div>
              <button onClick={handleGoBack}>Go Back</button>
            </div>
          </div>
        </section>
        <section
          className="initialpopup"
          style={{ display: initialpopup ? "block" : "none" }}
        >
          <div className="initialpopup-wrapper">
            <FaXmark className="xmark" onClick={handleContinue} />
            <ul>
              <li>
                Kenko creates a personalized health checkup roadmap for you.
              </li>
              <li>After each test, tap on the test to update your status.</li>
              <li>Follow the roadmap to the next test location.</li>
              <li>
                You must complete and confirm each test before moving to the
                next one.
              </li>
            </ul>
          </div>
        </section>
      </section>
      <footer style={footerStyle} ref={footerRef}>
        .
      </footer>
    </div>
  );
};

export default Steps;
