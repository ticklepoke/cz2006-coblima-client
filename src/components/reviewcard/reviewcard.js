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
      <div className="review">
        <div className="review-top">
          <div className="review-top-title">{title}</div>
          <div className="review-top-stars">
            <ReviewStars rating={rating} />
          </div>
        </div>
        <div className="review-mid">
          <div className="review-mid-content">{content}</div>
        </div>
        <div className="review-bot">
          <div className="review-bot-date">{date}</div>
        </div>
      </div>
    );
  }
}

export default Reviewcard;
