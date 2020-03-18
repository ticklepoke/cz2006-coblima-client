import React, { Component } from "react";
import "./login.css";
import LoginLogo from "../../images/login.svg";
import Title from "../../components/title/title";
import { Link } from "react-router-dom";
import Inputbar from "../../components/inputbar/inputbar";
import Submitbutton from "../../components/submitbutton/submitbutton";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = event => {
    alert("The submit button was clicked!");
    event.preventDefault();
  };
  render() {
    return (
      <div className="login-container">
        <div className="login-left-column">
          <Title />
          <img src={LoginLogo} alt="Login-Logo" className="login-logo" />
        </div>

        <div className="login-right-column">
          <div className="login-right-container">
            <h2 className="login-header">Login</h2>
            <Link to="/register">
              <p className="login-subheader">Click here to register</p>
            </Link>

            <form>
              <Inputbar text="Username" />
              <Inputbar text="Password" />
              <Submitbutton text="Login" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
