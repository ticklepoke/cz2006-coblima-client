import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./historycard.css";

import RatingStars from "../reviewstars/reviewstars";
import axios from "axios";

export class Historycard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {}
    };
  }

  componentDidMount() {
    axios
      .get("http://35.240.245.213/api/v1/courses/" + this.props.course)
      .then(res => this.setState({ course: res.data.data }))
      .catch(err => console.log(err));
  }

  render() {
    const title = '"' + this.props.title + '"';
    const rating = this.props.rating;
    const content = this.props.content;
    const date = this.props.date;
    const reviewID = this.props.id;
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
          <div className="history-card-bot-date">
            {this.state.course.courseCode} | {date}
          </div>
          <div className="dual-link-buttons">
            <Link
              to={{
                pathname: "/editreview",
                state: {
                  title: title,
                  rating: rating,
                  content: content,
                  date: date,
                  course: this.state.course,
                  reviewID: reviewID
                }
              }}
            >
              <button type="submit" className="edit-button dual-button">
                Edit
              </button>
            </Link>
            <button
              onClick={() => {
                this.props.deleteReview(this.props.id);
              }}
              type="submit"
              className="delete-button dual-button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Historycard;
