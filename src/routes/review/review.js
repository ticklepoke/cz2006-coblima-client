import React, { Component } from "react";
import { Rating } from "@material-ui/lab/";
import "./review.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
// images
import ReviewImage from "../../images/submit-review.svg";
// components
import Title from "../../components/title/title";
import Status from "../../components/status/status";
import InputBar from "../../components/inputbar/inputbar";

const StyledRating = withStyles({
  iconFilled: {
    color: "white"
  },
  iconHover: {
    color: "white"
  }
})(Rating);

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      rating: 0
    };
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleContentChange = event => {
    this.setState({ content: event.target.value });
  };

  handleSubmit = event => {
    alert(
      "Submitted Title: " +
        this.state.title +
        " Submitted Content: " +
        this.state.content +
        "with rating: " +
        this.state.rating
    );
    event.preventDefault();
  };

  render() {
    return (
      <div className="review-container">
        <div className="review-navbar">
          <Title />
          <Status />
        </div>
        <div className="review-body">
          <div className="review-body-left">
            <div className="review-body-title">Submit Review</div>
            <div className="review-body-form">
              <InputBar
                text="CZ2006: Software Engineering"
                inputbarStyle={{
                  margin: "10px 10px"
                }}
                disabled={true}
              />
              <InputBar
                text="Input Review Title:"
                inputbarStyle={{
                  margin: "10px 10px"
                }}
                changeInput={this.handleTitleChange}
              />
              <InputBar
                text="Enter Review Here..."
                inputbarStyle={{
                  height: "55%",
                  alignItems: "flex-start",
                  paddingTop: "15px",
                  margin: "10px 10px"
                }}
                changeInput={this.handleContentChange}
              />
              <div className="review-body-form-bot">
                <span className="rating-label">Rating</span>
                <StyledRating
                  name="simple-controlled"
                  value={this.state.value}
                  size="large"
                  onChange={(event, newValue) => {
                    this.setState({ rating: newValue });
                  }}
                />
                <Link to="/course" className="review-submit-link no-underline">
                  <Button
                    variant="secondary"
                    className="review-submit-button"
                    onClick={this.handleSubmit}
                  >
                    SUBMIT
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="review-body-right">
            <img className="review-body-right-image" src={ReviewImage} />
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
