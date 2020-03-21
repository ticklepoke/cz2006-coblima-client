import React, { Component } from "react";
import "./profile.css";
import ProfileLogo from "../../images/profile.svg";
import AvatarLogo from "../../images/avatar.svg";
import Title from "../../components/title/title";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
            <p className="profile-subheader">Welcome, Jeremy</p>
            <p className="profile-paragraph">Jeremy Tan Choong Tat</p>
            <p className="profile-paragraph">U1830020A</p>
            <p className="profile-paragraph">JEM0001@e.ntu.edu.sg</p>
            <button className="action-button"> Edit Password</button>
            <button className="action-button"> View Review History</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
