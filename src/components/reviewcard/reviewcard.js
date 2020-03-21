import React, { Component } from "react";
import "./reviewcard.css";

import ReviewStars from "../../components/reviewstars/reviewstars";

export class Reviewcard extends Component {
  render() {
    const title = '"' + this.props.title + '"';
    const rating = this.props.rating;
    const content = this.props.content;
    const date = this.props.date;
    return (
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
    );
  }
}

export default Reviewcard;
