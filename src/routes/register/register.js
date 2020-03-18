import React, { Component } from "react";
import "./register.css";
import LoginLogo from "../../images/login.svg";
import Title from "../../components/title/title";
import { Link } from "react-router-dom";
import Inputbar from "../../components/inputbar/inputbar";
import Submitbutton from "../../components/submitbutton/submitbutton";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="register-container">
        <div className="register-left-column">
          <Title />
          <img src={LoginLogo} alt="Login-Logo" className="register-logo" />
        </div>

        <div className="register-right-column">
          <div className="register-right-container">
            <h2 className="register-header">Register</h2>
            <Link to="/login">
              <p className="register-subheader">Click here for login</p>
            </Link>

            <form>
              <Inputbar text="Username" />
              <Inputbar text="Matriculation Number" />
              <Inputbar text="Password" />
              <Inputbar text="Confirm Password" />
              <Submitbutton text="Register" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
