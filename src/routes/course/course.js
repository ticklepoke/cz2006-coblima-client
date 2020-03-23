import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import "./course.css";
//images
import ActiveRating from "../../images/active-rating.svg";
import ActiveReview from "../../images/active-review.svg";
// import ActiveCredits from "../../images/active-credits.svg"; // not used at all at the moment
import InactiveRating from "../../images/inactive-rating.svg";
import InactiveReview from "../../images/inactive-review.svg";
import InactiveCredits from "../../images/inactive-credits.svg";
import course from "../../images/course.svg";

//components
import Title from "../../components/title/title";
import Searchbar from "../../components/searchbar/searchbar";
import Activetile from "../../components/activetile/activetile";
import Inactivetile from "../../components/inactivetile/inactivetile";
import Status from "../../components/status/status";
import Reviewcard from "../../components/reviewcard/reviewcard";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayReview: false
    };
  }

  toggleShowReview = event => {
    let currentIsDiplayReview = this.state.isDisplayReview;
    console.log("Toggling now, current:" + currentIsDiplayReview);
    this.setState({ isDisplayReview: !currentIsDiplayReview });
  };

  // searchCourse(term) {
  //   axios
  //     .get("http://35.240.245.213/api/v1/courses", {
  //       params: {
  //         search: term
  //       }
  //     })
  //     .then(res => {
  //       console.log(res);
  //       alert("Search Results: " + res.data.data[0].title.toLowerCase());
  //     })
  //     .catch(err => {
  //       console.log(err.response.body.data);
  //     });
  // }

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
            <div className="course-header-title">Software Engineering</div>
            <div className="course-header-bot">
              <div className="course-header-code">CZ2006</div>
              <Link to="/review" className="no-underline">
                <Button className="course-header-button">ADD REVIEW</Button>
              </Link>
            </div>
          </div>

          <RenderTiles
            isDisplayReview={this.state.isDisplayReview}
            toggleShowReview={this.toggleShowReview}
          />
        </div>
        <RenderContent isDisplayReview={this.state.isDisplayReview} />
      </div>
    );
  }
}

export default Course;

function RenderTiles(props) {
  if (props.isDisplayReview === false) {
    return (
      <div className="course-header-right">
        <Activetile
          image={ActiveRating}
          number={"4.6 / 5"}
          caption={"Overall Rating"}
        />
        <div onClick={props.toggleShowReview}>
          <Inactivetile
            image={InactiveReview}
            number={"23"}
            caption={"Reviews"}
          />
        </div>
        <Inactivetile
          image={InactiveCredits}
          number={"3"}
          caption={"Module Credits"}
        />
      </div>
    );
  } else {
    return (
      <div className="course-header-right">
        <div onClick={props.toggleShowReview}>
          <Inactivetile
            image={InactiveRating}
            number={"4.6 / 5"}
            caption={"Overall Rating"}
          />
        </div>
        <Activetile image={ActiveReview} number={"23"} caption={"Reviews"} />
        <Inactivetile
          image={InactiveCredits}
          number={"3"}
          caption={"Module Credits"}
        />
      </div>
    );
  }
}

function RenderContent(props) {
  if (props.isDisplayReview === false) {
    return (
      <div className="course-body">
        <div className="course-body-left">
          <div className="course-body-description">
            The course consists of two parts – (i) statistical credit rating
            models and (ii) credit derivatives. The first part would cover
            various statistical credit rating models including Altman’s Z-score,
            logistic regression, artificial neural network and intensity models.
            The second part will cover various models used to price credit
            derivative as well as tools used to manage credit risk. The topics
            covered would include real and risk neutral probability of default,
            RiskMetricsTM, CreditRisk+, default correlation, Copula, Basket
            default swap, CDOs etc.
          </div>
          <div className="course-body-prereq">
            Course Prerequisites: FE5101 - Derivatives and Fixed Income
          </div>
        </div>
        <div className="course-body-right">
          <img src={course} alt="course-logo" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="course-body">
        <div className="course-body-review">
          <Reviewcard
            title={"Highly Recommend this Course"}
            rating={4}
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu"
            date={"8th February 2020"}
          />
          <Reviewcard
            title={"Trash Course"}
            rating={2}
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu"
            date={"6th February 2020"}
          />
        </div>
      </div>
    );
  }
}
