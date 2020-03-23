import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./history.css";
//images
import ActiveReview from "../../images/active-review.svg";

//components
import Title from "../../components/title/title";
import Searchbar from "../../components/searchbar/searchbar";
import Activetile from "../../components/activetile/activetile";
import Status from "../../components/status/status";
import Historycard from "../../components/historycard/historycard";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayReview: true
    };
  }

  toggleShowReview = event => {
    let currentIsDiplayReview = this.state.isDisplayReview;
    console.log("Toggling now, current:" + currentIsDiplayReview);
    this.setState({ isDisplayReview: !currentIsDiplayReview });
  };
  render() {
    return (
      <div className="course-container">
        <div className="course-navbar">
          <Title />
          <Searchbar
            className="course-searchbar"
            searchbarStyle={{
              position: "fixed",
              top: "30px",
              left: "350px",
              padding: "10px 30px",
              width: "45%"
            }}
          />
          <Status />
        </div>
        <div className="course-header">
          <div className="course-header-left">
            <div className="course-header-title">Jeremy Tan Chong Tat</div>
            <div className="course-header-bot">
              <div className="course-header-code">U1830020A</div>
            </div>
          </div>
          <div className="course-header-right">
            <Activetile image={ActiveReview} number={"2"} caption={"Reviews"} />
          </div>
        </div>
        <div className="course-body">
          <div className="course-body-review">
            <Historycard
              title={"Highly Recommend this Course"}
              rating={4}
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu"
              date={"8th February 2020"}
            />
            <Historycard
              title={"Trash Course"}
              rating={2}
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu"
              date={"6th February 2020"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
