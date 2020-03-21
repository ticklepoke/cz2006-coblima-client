import React, { Component } from "react";
import { withRouter } from "react-router";
import "./register.css";
import LoginLogo from "../../images/login.svg";
import Title from "../../components/title/title";
import { Link } from "react-router-dom";
import Inputbar from "../../components/inputbar/inputbar";
import Submitbutton from "../../components/submitbutton/submitbutton";

import AuthService from "../../services/authService";

const auth = new AuthService("http://localhost:5000");

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handleUsernameChange = event => {
  //   this.setState({ username: event.target.value });
  // };

  // handlePasswordChange = event => {
  //   this.setState({ password: event.target.value });
  // };

  // handleConfirmPasswordChange = event => {
  //   this.setState({ confirmPassword: event.target.value });
  // };

  // handleMatriculationChange = event => {
  //   this.setState({ matriculation: event.target.value });
  // };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      // alert(
      //   "Password Matches, Username: " +
      //     this.state.username +
      //     " Password: " +
      //     this.state.password
      // );
      this.registerUser();
    } else {
      alert("Error: Password does not match");
    }
  };

  async registerUser() {
    // axios
    //   .post("http://localhost:5000/api/v1/auth/register", {
    //     name: this.state.name,
    //     email: this.state.email,
    //     password: this.state.password,
    //     matriculationNumber: this.state.matriculationNumber
    //   })
    //   .then(res => {
    //     auth.setToken(res.data.token);
    //     axios
    //       .get("http://localhost:5000/api/v1/auth/me", {
    //         headers: {
    //           Authorization: "Bearer " + auth.getToken()
    //         }
    //       })
    //       .then(res => {
    //         auth.setProfile(res.data.data);
    //         this.props.history.push("course");
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //     // this.props.history.push("course");
    //   })
    //   .catch(err => {
    //     console.log(err.response.data.error);
    //     alert(err.response.data.error);
    //   });
    auth
      .register(
        this.state.email,
        this.state.password,
        this.state.name,
        this.state.matriculationNumber
      )
      .then(res => this.props.history.push("course"))
      .catch(err => console.log(err));
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
              <Inputbar
                text="Full Name"
                name="name"
                changeInput={this.handleChange}
              />

              <Inputbar
                text="Email"
                name="email"
                changeInput={this.handleChange}
              />

              <Inputbar
                text="Matriculation Number"
                name="matriculationNumber"
                changeInput={this.handleChange}
              />
              <Inputbar
                text="Password"
                type="password"
                name="password"
                changeInput={this.handleChange}
              />
              <Inputbar
                text="Confirm Password"
                type="password"
                name="confirmPassword"
                changeInput={this.handleChange}
              />
              <Submitbutton text="Register" clickedSubmit={this.handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
