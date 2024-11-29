import React, { useState } from "react";
import logo from "/assets/images/logo.png";
import phone from "/assets/icons/phone_icon.svg";
import vector from "/assets/icons/search_icon.svg";
import key from "/assets/icons/key_icon.svg";
import eye from "/assets/icons/eye_icon.svg";
import profile from "/assets/icons/user_icon.svg";
import "../css/Register.css";
import dropdown from "/assets/icons/dropdown.svg";
import eye_W from "/assets/icons/eye_W.svg";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const uhidNumber = [2222111, 2344441, 2456666, 2456666];
  const [spanText, setspantext] = useState(12345555);
  const [isopen, setopen] = useState(false);
  const [showpass, hidepass] = useState(false);
  const [phonerNumber, setphonerNumber] = useState("");
  const [otp, setotp] = useState("");
  const [uhid, setuhid] = useState("");
  const pathput = useNavigate();

  function handledropdown() {
    setopen(!isopen);
  }

  function handleText(el) {
    setspantext(el);
    setuhid(el);
    setopen(!open);
  }

  function showPassword() {
    hidepass(!showpass);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (phonerNumber == 1111 && otp == 1111) {
      pathput("/levels");      
    }
    setotp("");
    setphonerNumber("");
    setspantext(12345555);
  }

  return (
    <section className="register">
      <div className="container">
        <div className="register-wrapper">
          <div className="logoalign">
            <img className="register-logo" src={logo} alt="" />
          </div>

          <form className="toregister">
            <label>Mobile Number</label>
            <div className="inputbox">
              <img src={phone} alt="" />
              <span style={{ fontSize: "15px", marginLeft: "8px" }}>+91</span>
              <input className="regnumber"
                type="number"
                value={phonerNumber}
                onChange={(e) => {
                  setphonerNumber(e.target.value);
                }}
                required
                style={{ fontSize: "15px" }}
              />
              <img src={vector} alt="" />
            </div>
            <label>OTP</label>
            <div className="inputbox">
              <img src={key} alt="" style={{ margin: "5px" }} />
              <input
                type={showpass ? "text" : "password"}
                value={otp}
                onChange={(e) => {
                  setotp(e.target.value);
                }}
                required
              />
              <img src={showpass ? eye_W : eye} alt="" onClick={showPassword} />
            </div>
            <label>UHID</label>
            <div className="testcase">
              <div className="uhidnumber">
                <div>
                  <img src={profile} alt="profile" />
                  <span>{spanText}</span>
                </div>

                <img
                  src={dropdown}
                  alt="dropdown"
                  onClick={handledropdown}
                  style={{
                    transform: isopen ? "rotate(-90deg)" : "rotate(0deg)",
                    cursor: "pointer",
                  }}
                />
              </div>
              <ul
                className="dropdown"
                style={{ display: isopen ? "block" : "none" }}
              >
                {uhidNumber.map((el, index) => (
                  <li
                    key={`${el}-${index}`}
                    onClick={() => {
                      handleText(el);
                    }}
                  >
                    {el}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="submit"
              className="btnsubmit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
