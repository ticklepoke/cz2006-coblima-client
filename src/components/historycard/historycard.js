import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./historycard.css";

import RatingStars from "../reviewstars/reviewstars";

export class Historycard extends Component {
  render() {
    const title = '"' + this.props.title + '"';
    const rating = this.props.rating;
    const content = this.props.content;
    const date = this.props.date;
    return (
      <div className="history-card">
        <div className="history-card-top">
          <div className="history-card-top-title">{title}</div>
          <div className="history-card-top-stars">
            <RatingStars rating={rating} />
          </div>
        </div>
        <div className="history-card-mid">
          <div className="history-card-mid-content">{content}</div>
        </div>
        <div className="history-card-bot">
          <div className="history-card-bot-date">{date}</div>
          <div className="dual-link-buttons">
            <Link
              to={{
                pathname: "/editreview",
                state: {
                  title: title,
                  rating: rating,
                  content: content,
                  date: date
                }
              }}
            >
              <button type="submit" className="edit-button dual-button">
                Edit
              </button>
            </Link>
            <Link to="/history">
              <button type="submit" className="delete-button dual-button">
                Delete
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Historycard;
