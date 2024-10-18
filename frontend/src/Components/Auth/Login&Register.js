import React from "react";
import "./Login&Register.css";
import LoginPagePNG from "../../Assets/LoginPage.png";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
export default function LoginRegister() {
  return (
    <>
      <div className="login_register_container">
        <div className="l_r_left">
          <div className="l_r_left_center">
            <div className="l_r_center_circle">
              <img alt="loginimg" src={LoginPagePNG} />
            </div>
          </div>
          <div className="l_r_center_text">
            <h2>Welcome aboard my friend</h2>
            <h4>just a couple of clicks and we start</h4>
          </div>
        </div>
        <div className="l_r_right">

        <div className="l_r_right_heading">Login</div>
        <div className="l_r_right_form">
{
  false? <LoginForm/>: <RegisterForm/>
}
         
        </div>
        <div className="l_r_right_buttons">
          <button className="l_r_r_b1">Log In</button>
          <div> Have no account yet?</div>
          <button className="l_r_r_b2">Register</button>
        </div>
        </div>
      </div>
    </>
  );
}
