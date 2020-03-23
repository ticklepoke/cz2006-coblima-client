import React, { Fragment, Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import home from "../../images/home.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Title from "../../components/title/title";
import Status from "../../components/status/status";
import "./home.css";
import Searchbar from "../../components/searchbar/searchbar";

import authService from "../../services/authService";
import AOS from "aos";

const auth = new authService("http://35.240.245.213");

AOS.init();

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }
  getSearchSuggestion = term => {
    axios
      .get("http://35.240.245.213/api/v1/courses", {
        params: {
          search: term
        }
      })
      .then(res => {
        this.setState({ searchResults: res.data.data });
      })
      .catch(err => {
        console.log(err.response.body.data);
      });
  };

  renderSuggestions = () => {
    if (this.state.searchResults < 1) {
      return null;
    }
    const results = this.state.searchResults.slice(0, 4).map(course => {
      return (
        <div
          style={{
            cursor: "pointer",
            backgroundColor: "#fff",
            width: "100%",
            fontSize: 30
          }}
          onClick={() => {
            this.props.history.push({
              pathname: "/course",
              state: { course }
            });
          }}
        >
          <p>{course.courseCode + ": " + titleCase(course.title)}</p>
        </div>
      );
    });
    return results;
  };
  render() {
    return (
      <div className="App">
        <img src={home} className="home-image" alt="home" />

        {/* Header Tab */}

        <Title color="white" data-aos="fade" />

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
          <Status />
        )}

        <Searchbar
          data-aos="fade-in"
          className="home-searchbar"
          searchbarStyle={{
            "z-index": "1",
            position: "absolute",
            top: "60%",
            left: "30%"
          }}
          searchTerm={term => this.getSearchSuggestion(term)}
        />
        {this.state.searchResults.length === 0 ? null : (
          <div
            style={{
              position: "absolute",
              top: "70%",
              left: "30%",
              backgroundColor: "white",
              textAlign: "start",
              boxShadow: "2px 2px 3px #777",
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 20,
              paddingLeft: 20,
              borderRadius: 10
            }}
          >
            {this.renderSuggestions()}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Home);

function titleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
