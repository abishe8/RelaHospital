import React from "react";
import logo from "/assets/images/logo.png";
import "../css/Interface.css"
import  { Link }  from "react-router-dom"

const Inerface = () => {
  return (
    <section className="front">
         <div>
              <div className="front-wrapper">
                  <img className="intrologo " src={logo} alt="logo" />
                 <Link to="/login" style={{textDecoration:"none"}} ><h3 className="tap" >Tap to begin</h3></Link>       
              </div>
         </div>
    </section>
  );
};

export default Inerface;
