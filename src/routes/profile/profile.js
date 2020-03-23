import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import ProfileLogo from "../../images/profile.svg";
import AvatarLogo from "../../images/avatar.svg";
import Title from "../../components/title/title";
import AuthService, {
  retrieveAuthenticationHeader
} from "../../services/authService";
import ThinInputbar from "../../components/thininputbar/thininputbar";
import axios from "axios";

const auth = new AuthService("http://35.240.245.213");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: { name: "", matriculationNumber: "", email: "" },
      editPassword: false,
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  }

  componentDidMount() {
    const profile = auth.getProfile();

    if (profile) {
      this.setState({ profile });
    }
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePasswordSubmit = e => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      alert("New password does not match");
      return;
    }
    if (newPassword.length === 0 || oldPassword.length === 0) {
      alert("Please enter all fields");
      return;
    }
    axios
      .put(
        "http://35.240.245.213/api/v1/auth/updatepassword",
        {
          currentPassword: oldPassword,
          newPassword
        },
        retrieveAuthenticationHeader()
      )
      .then(res => {
        alert("Password Updated!");
        this.setState({
          editPassword: false,
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        auth.setToken(res.data.token);
      })
      .catch(err => {
        console.log(err.response);
        alert(err.response.data.error);
        this.setState({
          editPassword: false,
          oldPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      });
  };

  togglePasswordEditMode = () => {
    this.setState({
      editPassword: !this.state.editPassword,
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    
  };

  render() {
    const { profile } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-left-column">
          <Title />
          <img src={ProfileLogo} alt="Login-Logo" className="login-logo" />
        </div>

        <div className="profile-right-column">
          <div className="profile-right-container">
            <h2 className="profile-header">Account Settings</h2>
            <img src={AvatarLogo} alt="Avatar-Logo" className="avatar-logo" />
            <p className="profile-subheader">
              Welcome, {profile.name.split(" ")[0]}
            </p>
            <p className="profile-paragraph">{profile.name}</p>
            <p className="profile-paragraph">{profile.matriculationNumber}</p>
            <p className="profile-paragraph">{profile.email}</p>
            <button
              className={this.state.editPassword ? "action-button active-action-button" : "action-button"}
              style={{ cursor: "pointer" }}
              onClick={this.togglePasswordEditMode}
            >
              Edit Password
            </button>
            {this.state.editPassword ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <div>
                  <form
                    style={{ width: "100%" }}
                  >
                    <ThinInputbar
                      text="Old Password"
                      type="password"
                      name="oldPassword"
                      changeInput={this.handleChange}
                      class="action-button"
                    />
                    <ThinInputbar
                      text="New Password"
                      type="password"
                      name="newPassword"
                      changeInput={this.handleChange}
                    />
                    <ThinInputbar
                      text="Confirm New Password"
                      type="password"
                      name="confirmPassword"
                      changeInput={this.handleChange}
                    />
                  </form>
                  <button
                    className="action-button"
                    style={{ cursor: "pointer" }}
                    onClick={this.handlePasswordSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : null}
            <Link to="/history">
              <button className={this.state.editPassword ? "review-history-button hide-review-history-button action-button" : "review-history-button action-button"} style={{ cursor: "pointer" }}>
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
