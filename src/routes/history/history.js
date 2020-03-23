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

import authService from "../../services/authService";
import axios from "axios";
import moment from "moment";

const auth = new authService("http://35.240.245.213");

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayReview: true,
      reviews: []
    };
  }

  componentDidMount() {
    const userID = auth.getProfile()._id;
    if (!userID) return;

    axios
      .get("http://35.240.245.213/api/v1/auth/" + userID + "/reviews")
      .then(res => {
        this.setState({ reviews: res.data.data });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  renderHistoryCards = () => {
    if (this.state.reviews.length === 0) return;
    const cards = this.state.reviews.map(review => {
      console.log(review);
      return (
        <Historycard
          title={review.title}
          rating={review.rating}
          content={review.description}
          date={moment(review.createdAt).format("h:mm a, Do MMM YYYY")}
        />
      );
    });
    return cards;
  };
  toggleShowReview = event => {
    let currentIsDiplayReview = this.state.isDisplayReview;
    console.log("Toggling now, current:" + currentIsDiplayReview);
    this.setState({ isDisplayReview: !currentIsDiplayReview });
  };
  render() {
    const { name, matriculationNumber } = auth.getProfile();
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
            <div className="course-header-title">{name}</div>
            <div className="course-header-bot">
              <div className="course-header-code">{matriculationNumber}</div>
            </div>
          </div>
          <div className="course-header-right">
            <Activetile
              image={ActiveReview}
              number={this.state.reviews.length}
              caption={"Reviews"}
            />
          </div>
        </div>
        <div className="course-body">
          <div className="course-body-review">{this.renderHistoryCards()}</div>
        </div>
      </div>
    );
  }
}

export default Course;
