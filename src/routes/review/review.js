import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import _ from "lodash";
import { Rating } from "@material-ui/lab/";
import "./review.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
// images
import ReviewImage from "../../images/submit-review.svg";
// components
import Title from "../../components/title/title";
import Status from "../../components/status/status";
import InputBar from "../../components/inputbar/inputbar";
import Textareabar from "../../components/textareabar/textareabar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { retrieveAuthenticationHeader } from "../../services/authService";

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
      courseSuggestions: [],
      selectedCourse: {},
      title: "",
      content: "",
      rating: 0
    };
  }

  componentDidMount() {
    if (this.props.location.state.selectedCourse) {
      this.setState({
        selectedCourse: this.props.location.state.selectedCourse
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (
      _.isEmpty(this.state.selectedCourse) ||
      this.state.title.length === 0 ||
      this.state.content.length === 0
    ) {
      return;
    }

    axios
      .post(
        `http://35.240.245.213/api/v1/courses/${this.state.selectedCourse._id}/reviews`,
        {
          title: this.state.title,
          description: this.state.content,
          rating: this.state.rating
        },
        retrieveAuthenticationHeader()
      )
      .then(res => {
        alert("Review Added!");
        this.props.history.push("/course");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  handleCourseSearch = e => {
    e.preventDefault();
    axios
      .get("http://35.240.245.213/api/v1/courses", {
        params: {
          search: e.target.value
        }
      })
      .then(res => {
        this.setState({ courseSuggestions: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderCourseSuggestions = () => {
    if (this.state.courseSuggestions) {
      const list = this.state.courseSuggestions.map(course => {
        return (
          <div
            style={{
              backgroundColor: "#fff",
              padding: 5,
              borderRadius: 5,
              cursor: "pointer"
            }}
            onClick={() => this.selectCourse(course)}
          >
            <p>{course.courseCode + ": " + titleCase(course.title)}</p>
          </div>
        );
      });
      return list;
    }
  };

  selectCourse = course => {
    this.setState({ selectedCourse: course, courseSuggestions: [] });
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
              {!_.isEmpty(this.state.selectedCourse) ? (
                <div style={{ color: "#fff", marginTop: 20, display: "flex" }}>
                  <h3>
                    {this.state.selectedCourse.courseCode +
                      ": " +
                      titleCase(this.state.selectedCourse.title)}
                  </h3>
                  <button
                    onClick={() => {
                      this.setState({ selectedCourse: {} });
                    }}
                    style={{
                      border: "none",
                      backgroundColor: "#A7A1FF",
                      cursor: "pointer",
                      paddingLeft: 10
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      style={{ color: "#fff" }}
                    />
                  </button>
                </div>
              ) : (
                <Fragment>
                  <InputBar
                    text="Input Course Code or Title"
                    inputbarStyle={{
                      margin: "10px 10px"
                    }}
                    changeInput={this.handleCourseSearch}
                    // disabled={true}
                  />

                  <div
                    style={{
                      position: "fixed",
                      zIndex: 10,
                      display: "block",
                      top: 270,
                      left: 150,
                      border: "1px solid #777",
                      boxShadow: "1px 1px 3px #777",
                      borderRadius: 5
                    }}
                  >
                    {this.renderCourseSuggestions()}
                  </div>
                </Fragment>
              )}
              <InputBar
                text="Input Review Title:"
                inputbarStyle={{
                  margin: "10px 10px"
                }}
                name="title"
                changeInput={this.handleChange}
              />
              <Textareabar
                text="Enter Review Here..."
                inputbarStyle={{
                  height: "55%",
                  alignItems: "flex-start",
                  paddingTop: "15px",
                  margin: "10px 10px"
                }}
                name="content"
                changeInput={this.handleChange}
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

export default withRouter(Review);

function titleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
