//dependencies
import React, { Fragment, Component } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Fade from "react-reveal/Fade";

//assets
import home from "../../images/home.svg";
import Title from "../../components/title/title";
import Status from "../../components/status/status";
import "./home.css";
import Searchbar from "../../components/searchbar/searchbar";

import authService from "../../services/authService";
const auth = new authService("http://35.240.245.213");

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
          className="search-results"
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
        <Fade>
          <img src={home} className="home-image" alt="home" />
        </Fade>
        <Fade left duration={1000}>
          <Title color="white" />
        </Fade>
        <Fade right duration={1000}>
          <Status />
        </Fade>
        <Searchbar
          searchbarStyle={
            this.state.searchResults.length === 0
              ? {
                  "z-index": "1",
                  position: "absolute",
                  top: "53%",
                  left: "30%",
                  transition: "all 0.5s"
                }
              : {
                  "z-index": "1",
                  position: "absolute",
                  top: "53%",
                  left: "30%",
                  borderRadius: "10px 10px 0px 0px",
                  transition: "all 0.5s"
                }
          }
          searchTerm={term => this.getSearchSuggestion(term)}
        />
        {this.state.searchResults.length === 0 ? (
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "30%",
              width: "55%",
              backgroundColor: "white",
              textAlign: "start",
              boxShadow: "2px 2px 3px #777",
              paddingTop: "4%",
              paddingBottom: 10,
              paddingRight: 20,
              paddingLeft: 20,
              borderRadius: "0px 0px 10px 10px",
              opacity: 0,
              transition: "opacity 0.6s"
            }}
          >
            {this.renderSuggestions()}
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "30%",
              width: "55%",
              backgroundColor: "white",
              textAlign: "start",
              boxShadow: "2px 2px 3px #777",
              paddingTop: "4%",
              paddingBottom: 10,
              paddingRight: 20,
              paddingLeft: 20,
              borderRadius: "0px 0px 10px 10px",
              transition: "opacity 0.9s"
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
