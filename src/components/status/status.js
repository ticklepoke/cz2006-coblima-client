import React, { Component } from "react";
import { withRouter } from "react-router";
import "./status.css";

import Triangle from "../../images/triangle.svg";
import AuthService from "../../services/authService";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const auth = new AuthService("http://35.240.245.213");

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", toggleDropdown: false };
  }
  componentDidMount() {
    const profile = auth.getProfile();
    if (profile) {
      console.log("Profile Name Logged is ", profile);
      this.setState({ name: profile.name });
    }
  }

  toggleDropdown = () => {
    this.setState({ toggleDropdown: !this.state.toggleDropdown });
  };

  logoutUser = () => {
    auth.logout();
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        {!auth.loggedIn() ? (
          <div className="buttons">
            <Link to="/register" className="no-underline">
              <Button
                variant="primary"
                size="lg"
                className="form-button register-button"
              >
                REGISTER
              </Button>
            </Link>
            <Link to="/login" className="no-underline">
              <Button
                variant="secondary"
                size="lg"
                className="form-button login-button"
              >
                LOGIN
              </Button>
            </Link>
          </div>
        ) : (
          <div
            className={
              this.state.toggleDropdown
                ? "status-container toggle-status-container"
                : "status-container"
            }
          >
            <h4 className="status-name">{this.state.name}</h4>
            <button
              className={
                !this.state.toggleDropdown
                  ? "dropdown-triangle"
                  : "dropdown-triangle toggle-triangle"
              }
              onClick={this.toggleDropdown}
            >
              <img src={Triangle} alt="status-arrow" className="status-arrow" />
            </button>

            {this.state.toggleDropdown ? (
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "0px",
                  borderRadius: "5px"
                }}
              >
                <div>
                  <button
                    className="status-button"
                    onClick={() => this.props.history.push("/profile")}
                  >
                    <h5 className="status-subtext">Profile</h5>
                  </button>
                </div>
                <button className="status-button" onClick={this.logoutUser}>
                  <h5 className="status-subtext">Logout</h5>
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Status);
