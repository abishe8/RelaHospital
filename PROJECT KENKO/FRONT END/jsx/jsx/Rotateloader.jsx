import React, { useEffect, useState } from "react";
import "../css/rotateloader.css";
import RotateLogo from "/assets/images/rotatelogo.svg"; // Ensure you have the correct path for the logo
import { useNavigate } from "react-router";



const RotateLoader = () => {
  const  [n, setN] = useState(0); // Angle for rotation
  const  [m, setM] = useState(1000); // Delay between rotations
  const  [p, setP] = useState(0.6); // Transition duration
  const testNumber = 3
const pathput = useNavigate()
 if(n >= 360){
  let check = testNumber === 2 ?  setTimeout(()=>{ pathput("/final")},1000) : setTimeout(()=>{ pathput("/spinner")},1000)
  
  }
  useEffect(() => {
    const change = () => {
      if (n < 360) {
        setN(prev => prev + 90); // Increment the angle by 90 degrees
        setP(0.5); 
      }

    };

    const timeoutId1 = setTimeout(change, 1000);
    const timeoutId2 = setTimeout(change, 2000);
    const timeoutId3 = setTimeout(change, 3000);
    const timeoutId4 = setTimeout(change, 4000);
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      clearTimeout(timeoutId4);
    };

  }, [n]); 




  return (
     <>
      
          <section className="rotate-loader">
         <img
          className="rotate-logo"
          style={{
            transform: `rotate(${n}deg)`,
            transition: `transform ${p}s ease-in-out`,
          }}
          width="124px"
          src={RotateLogo}
          alt="Rotate Logo"
        />
      </section>

      </>
  );
};

export default RotateLoader;
