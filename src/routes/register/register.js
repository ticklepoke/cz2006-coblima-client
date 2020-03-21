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

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value});
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange = (event) => {
    this.setState({confirmPassword: event.target.value});
  }

  handleMatriculationChange = (event) => {
    this.setState({matriculation: event.target.value});
  }

  handleSubmit = event => {
    if (this.state.password === this.state.confirmPassword) {
      alert("Password Matches, Username: " + this.state.username + " Password: " + this.state.password);
    } else {
      alert("Error: Password does not match");
    }
    event.preventDefault();
  };

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
              <Inputbar text="Username" changeInput={this.handleUsernameChange}/>
              <Inputbar text="Matriculation Number" changeInput={this.handleMatriculationChange}/>
              <Inputbar text="Password" changeInput={this.handlePasswordChange}/>
              <Inputbar text="Confirm Password" changeInput={this.handleConfirmPasswordChange}/>
              <Submitbutton text="Register" clickedSubmit={this.handleSubmit}/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
