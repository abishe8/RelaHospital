import React from "react";
import "../css/loader.css";
import ecg from "/assets/icons/ecgloader.svg";

const Loader = () => {
  return (
    <section className="loader">
      <div>
        <div className="loader-wrapper">
          <img src={ecg} alt="logo" />
        </div>
      </div>
    </section>
  );
};

export default Loader;
