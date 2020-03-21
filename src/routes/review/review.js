import React, { Component } from "react";
import "./review.css";
// images
import ReviewImage from "../../images/submit-review.svg";
// components
import Title from "../../components/title/title";
import Status from "../../components/status/status";
import InputBar from "../../components/inputbar/inputbar";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: ""
    };
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleContentChange = event => {
    this.setState({ content: event.target.value });
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
                text="CZ2006"
                inputbarStyle={{
                  margin: "10px 10px"
                }}
              />
              <InputBar
                text="Review Title"
                inputbarStyle={{
                  margin: "10px 10px"
                }}
              />
              <InputBar
                text="Enter Review Here..."
                inputbarStyle={{
                  height: "55%",
                  alignItems: "flex-start",
                  paddingTop: "15px",
                  margin: "10px 10px"
                }}
              />
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