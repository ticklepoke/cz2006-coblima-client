import React, { Component } from "react";
import { withRouter } from "react-router";
import "./login.css";
import LoginLogo from "../../images/login.svg";
import Title from "../../components/title/title";
import { Link } from "react-router-dom";
import Inputbar from "../../components/inputbar/inputbar";
import Submitbutton from "../../components/submitbutton/submitbutton";

import axios from "axios";
import AuthService from "../../services/authService";

const auth = new AuthService("http://35.240.245.213");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = event => {
    // alert(
    //   "Submitted Username: " +
    //     this.state.username +
    //     " Submitted password: " +
    //     this.state.password
    // );
    event.preventDefault();
    this.loginUser();
  };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginUser() {
    // axios
    //   .post("http://localhost:5000/api/v1/auth/login", {
    //     email: this.state.email,
    //     password: this.state.password
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.props.history.push("course");
    //   })
    //   .catch(err => alert(err.response.data.error));

    auth
      .login(this.state.email, this.state.password)
      .then(res => {
        console.log(res);
        this.props.history.push("course");
      })
      .catch(err => {
        console.log(err);
      });
  }

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
              <Inputbar
                text="Email"
                name="email"
                changeInput={this.handleChange}
              />
              <Inputbar
                text="Password"
                type="password"
                name="password"
                changeInput={this.handleChange}
              />
              <Submitbutton text="Login" clickedSubmit={this.handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
