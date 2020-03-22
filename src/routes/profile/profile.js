import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import ProfileLogo from "../../images/profile.svg";
import AvatarLogo from "../../images/avatar.svg";
import Title from "../../components/title/title";
import AuthService from "../../services/authService";
import Inputbar from "../../components/inputbar/inputbar";

const auth = new AuthService("http://35.240.245.213");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: { name: "", matriculationNumber: "", email: "" },
      editPassword: false
    };
  }

  componentDidMount() {
    const profile = auth.getProfile();

    if (profile) {
      this.setState({ profile });
    }
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-left-column">
          <Title />
          <img src={ProfileLogo} alt="Login-Logo" className="login-logo" />
        </div>

        <div className="profile-right-column">
          <div className="login-right-container">
            <h2 className="profile-header">Account Settings</h2>
            <img src={AvatarLogo} alt="Avatar-Logo" className="avatar-logo" />
            <p className="profile-subheader">
              Welcome, {profile.name.split(" ")[0]}
            </p>
            <p className="profile-paragraph">{profile.name}</p>
            <p className="profile-paragraph">{profile.matriculationNumber}</p>
            <p className="profile-paragraph">{profile.email}</p>
            <button
              className="action-button"
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.setState({ editPassword: true });
              }}
            >
              {" "}
              Edit Password
            </button>
            {this.state.editPassword ? (
              <form
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "20"
                }}
              >
                <div style={{ width: "100%" }}>
                  <Inputbar text="Old Password" />
                  <Inputbar text="New Password" />
                  <Inputbar text="Confirm New Password" />
                </div>
              </form>
            ) : null}
            <Link to="/history">
              <button className="action-button" style={{ cursor: "pointer" }}>
                {" "}
                View Review History
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
