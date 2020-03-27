import React, { Component } from "react";
import { Fade } from "react-reveal";
import "./reviewcard.css";

import Avatarblack from "../../images/avatarblack.svg";
import ReviewStars from "../../components/reviewstars/reviewstars";

export class Reviewcard extends Component {
  render() {
    const title = '"' + this.props.title + '"';
    const rating = this.props.rating;
    const content = this.props.content;
    const date = this.props.date;
    const reviewUsername = this.props.reviewUsername;
    return (
      <Fade left>
        <div className="review-total">
          <div className="review-avatar">
            <img
              alt="Profile"
              className="review-avatar-image"
              src={Avatarblack}
            />
            <div className="review-avatar-name">{reviewUsername}</div>
          </div>
          <div className="review-card">
            <div className="review-card-top">
              <div className="review-card-top-title">{title}</div>
              <div className="review-card-top-stars">
                <ReviewStars rating={rating} />
              </div>
            </div>
            <div className="review-card-mid">
              <div className="review-card-mid-content">{content}</div>
            </div>
            <div className="review-card-bot">
              <div className="review-card-bot-date">{date}</div>
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}

export default Reviewcard;
