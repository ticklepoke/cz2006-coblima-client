import React, { Component } from "react";
import "./course.css";
import rating from "../../images/rating.svg";
import review from "../../images/review.svg";
import course from "../../images/course.svg";
import credits from "../../images/credits.svg";

import Title from "../../components/title/title";
import Searchbar from "../../components/searchbar/searchbar";
import Coursetile from "../../components/coursetile/coursetile";
import Status from "../../components/status/status";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="course-container">
        <div className="course-navbar">
          <Title />
          <Searchbar
            className="course-searchbar"
            searchbarStyle={{
              "z-index": "1",
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
            <div className="course-header-code">CZ2006</div>
          </div>
          <div className="course-header-right">
            <Coursetile
              image={rating}
              number={"4.6 / 5"}
              caption={"Overall Rating"}
            />
            <Coursetile image={review} number={"23"} caption={"Reviews"} />
            <Coursetile
              image={credits}
              number={"3"}
              caption={"Module Credits"}
            />
          </div>
        </div>
        <div className="course-body">
          <div className="course-body-left">
            <div className="course-body-description">
              The course consists of two parts – (i) statistical credit rating
              models and (ii) credit derivatives. The first part would cover
              various statistical credit rating models including Altman’s
              Z-score, logistic regression, artificial neural network and
              intensity models. The second part will cover various models used
              to price credit derivative as well as tools used to manage credit
              risk. The topics covered would include real and risk neutral
              probability of default, RiskMetricsTM, CreditRisk+, default
              correlation, Copula, Basket default swap, CDOs etc.
            </div>
            <div className="course-body-prereq">
              Course Prerequisites: FE5101 - Derivatives and Fixed Income
            </div>
          </div>
          <div className="course-body-right">
            <img src={course} alt="course-logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default Course;
