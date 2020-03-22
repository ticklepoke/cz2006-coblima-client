import React, { Component } from "react";
import { withRouter } from "react-router";
import "./status.css";

import Triangle from "../../images/triangle.svg";
import AuthService from "../../services/authService";
import zIndex from "@material-ui/core/styles/zIndex";

const auth = new AuthService("http://35.240.245.213");

class Status extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", toggleDropdown: false };
  }
  componentDidMount() {
    const profile = auth.getProfile();
    if (profile) {
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
      <div className="status-container">
        <h2 className="status-name">{this.state.name}</h2>
        <button
          style={{
            border: "none",
            cursor: "pointer",
            backgroundColor: "#fff"
          }}
          onClick={this.toggleDropdown}
        >
          <img src={Triangle} alt="status-arrow" className="status-arrow" />
        </button>

        {this.state.toggleDropdown ? (
          <div
            style={{
              border: "1px solid grey",
              marginTop: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              boxShadow: "1px 1px 3px #777",
              zIndex: "100"
            }}
          >
            <div style={{ borderBottom: "1px solid grey" }}>
              <button
                style={{
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: "#fff"
                }}
                onClick={() => this.props.history.push("/profile")}
              >
                <h6 style={{ color: "#777777" }}>Profile</h6>
              </button>
            </div>
            <button
              style={{
                border: "none",
                cursor: "pointer",
                backgroundColor: "#fff",
                borderRadius: "10px"
              }}
              onClick={this.logoutUser}
            >
              <h6 style={{ color: "#777777" }}>Logout</h6>
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Status);
