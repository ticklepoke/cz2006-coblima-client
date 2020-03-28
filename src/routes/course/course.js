import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";
import moment from "moment";
import { Pulse } from "react-motions";
import { Fade, LightSpeed } from "react-reveal";
//styles
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
      isDisplayReview: false,
      course: {
        title: "",
        description: "",
        academicUnits: 0,
        courseCode: ""
      },
      reviews: [],
      searchResults: []
    };
  }

  componentWillMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push("/");
    }
  }
  componentDidMount() {
    if (this.props.location.state === undefined) return;
    axios
      .get(
        "http://35.240.245.213/api/v1/courses/" +
          this.props.location.state.course._id
      )
      .then(res => {
        this.setState({ course: res.data.data });
        axios
          .get(
            "http://35.240.245.213/api/v1/courses/" +
              res.data.data._id +
              "/reviews"
          )
          .then(res => {
            // setState reviewData
            let userId;
            let reviewData = res.data.data;

            // retrieve user name from user id in each review
            reviewData.forEach(review => {
              userId = review.user;
              axios
                .get("http://35.240.245.213/api/v1/users/" + userId)
                .then(res => {
                  review["username"] = res.data.data.name;
                })
                .catch(err => console.log(err.response));
            });

            // set state for reviewData as reviews
            this.setState({ reviews: reviewData });

            // calculate averageReview
            let sumReviews = 0;
            reviewData.forEach(review => {
              sumReviews += review["rating"];
            });

            let averageReview = sumReviews / reviewData.length;
            this.setState({ averageReview: averageReview });
          })
          .catch(err => console.log(err.response));
      })
      .catch(err => console.log(err.response));
  }

  toggleShowReview = event => {
    let currentIsDiplayReview = this.state.isDisplayReview;
    this.setState({ isDisplayReview: !currentIsDiplayReview });
  };

  fetchData = course => {
    axios
      .get("http://35.240.245.213/api/v1/courses/" + course._id)
      .then(res => {
        this.setState({ course: res.data.data });
        axios
          .get(
            "http://35.240.245.213/api/v1/courses/" +
              res.data.data._id +
              "/reviews"
          )
          .then(res => {
            // setState reviewData
            let userId;
            let reviewData = res.data.data;

            // retrieve user name from user id in each review
            reviewData.forEach(review => {
              userId = review.user;
              axios
                .get("http://35.240.245.213/api/v1/users/" + userId)
                .then(res => {
                  review["username"] = res.data.data.name;
                })
                .catch(err => console.log(err.response));
            });
            console.log("Setting Review Data to", reviewData);
            // set state for reviewData as reviews
            this.setState({ reviews: reviewData });
            console.log("this.state.reviews is", this.state.reviews);

            // calculate averageReview
            let sumReviews = 0;
            reviewData.forEach(review => {
              sumReviews += review["rating"];
            });

            let averageReview = sumReviews / reviewData.length;
            this.setState({ averageReview: averageReview });
            this.setState({ isDisplayReview: false });
          })
          .catch(err => console.log(err.response));
      })
      .catch(err => console.log(err.response));
  };

  searchTerm = term => {
    axios
      .get("http://35.240.245.213/api/v1/courses", {
        params: {
          search: term
        }
      })
      .then(res => {
        this.setState({ searchResults: res.data.data });
      })
      .catch(err => {
        console.log(err.response.body.data);
      });
  };

  renderSuggestions = () => {
    if (this.state.searchResults < 1) {
      return null;
    }
    const results = this.state.searchResults.slice(0, 4).map(course => {
      return (
        <div
          className="search-results"
          onClick={() => {
            this.setState({ searchResults: [] });
            this.fetchData(course);
          }}
        >
          <p>{course.courseCode + ": " + titleCase(course.title)}</p>
        </div>
      );
    });
    return results;
  };
  render() {
    const { title, courseCode } = this.state.course;
    return (
      <div className="course-container">
        <Searchbar
          delay={1500}
          duration={300}
          className="course-searchbar"
          searchbarStyle={
            this.state.searchResults.length === 0
              ? {
                  position: "fixed",
                  top: "30px",
                  left: "350px",
                  transition: "all 0.5s",
                  zIndex: 99,
                  width: "45%",
                  padding: "10px 30px"
                }
              : {
                  position: "fixed",
                  top: "30px",
                  left: "350px",
                  borderRadius: "10px 10px 0px 0px",
                  transition: "all 0.5s",
                  zIndex: 99,
                  width: "45%",
                  padding: "10px 30px"
                }
          }
          searchTerm={this.searchTerm}
        />
        {this.state.searchResults.length === 0 ? (
          <div
            style={{
              position: "fixed",
              top: "30px",
              left: "350px",
              width: "45%",
              backgroundColor: "white",
              textAlign: "start",
              boxShadow: "2px 2px 3px #777",
              paddingTop: "2%",
              paddingBottom: 10,
              paddingRight: 20,
              paddingLeft: 20,
              borderRadius: "0px 0px 10px 10px",
              opacity: 0,
              transition: "opacity 0.6s",
              zIndex: 98
            }}
          >
            {this.renderSuggestions()}
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "80px",
              left: "350px",
              width: "45%",
              backgroundColor: "white",
              textAlign: "start",
              boxShadow: "2px 2px 3px #777",
              paddingTop: "2%",
              paddingBottom: 10,
              paddingRight: 20,
              paddingLeft: 20,
              borderRadius: "0px 0px 10px 10px",
              transition: "opacity 0.9s",
              zIndex: 97
            }}
          >
            {this.renderSuggestions()}
          </div>
        )}
        <Fade top>
          <div className="course-navbar">
            <Title />
            <Status />
          </div>
        </Fade>
        <Fade top>
          <div className="course-header">
            <div className="course-header-left">
              <div className="course-header-final-title">
                {titleCase(title)}
              </div>
              <div className="course-header-bot">
                <div className="course-header-code">{courseCode}</div>
                <Link
                  to={{
                    pathname: "/review",
                    state: {
                      selectedCourse: this.state.course
                    }
                  }}
                  className="no-underline"
                >
                  <Button className="course-header-button">ADD REVIEW</Button>
                </Link>
              </div>
            </div>
            <RenderTiles
              isDisplayReview={this.state.isDisplayReview}
              toggleShowReview={this.toggleShowReview}
              course={this.state.course}
              reviews={this.state.reviews}
              averageReview={this.state.averageReview}
            />
          </div>
        </Fade>

        <RenderContent
          isDisplayReview={this.state.isDisplayReview}
          course={this.state.course}
          reviews={this.state.reviews}
        />
      </div>
    );
  }
}

export default withRouter(Course);

function RenderTiles(props) {
  const averageReview = Math.round(props.averageReview * 10) / 10 || "-";
  if (props.isDisplayReview === false) {
    return (
      <div className="course-header-right">
        <Activetile
          image={ActiveRating}
          number={averageReview + " / 5"}
          caption={"Overall Rating"}
        />
        <div onClick={props.toggleShowReview}>
          <Pulse infinite>
            <Inactivetile
              image={InactiveReview}
              number={props.reviews.length}
              caption={"Reviews"}
            />
          </Pulse>
        </div>
        <Inactivetile
          image={InactiveCredits}
          number={props.course.academicUnits}
          caption={"Module Credits"}
        />
      </div>
    );
  } else {
    return (
      <div className="course-header-right">
        <div onClick={props.toggleShowReview}>
          <Pulse infinite>
            <Inactivetile
              image={InactiveRating}
              number={averageReview + " / 5"}
              caption={"Overall Rating"}
            />
          </Pulse>
        </div>
        <Activetile
          image={ActiveReview}
          number={props.reviews.length}
          caption={"Reviews"}
        />
        <Inactivetile
          image={InactiveCredits}
          number={props.course.academicUnits}
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
        <Fade left>
          <div className="course-body-left">
            <div className="course-body-description">
              {props.course.description}
            </div>
            <div className="course-body-prereq">
              Course Prerequisites: {props.course.prerequisite}
            </div>
          </div>
        </Fade>
        <LightSpeed right>
          <div className="course-body-right">
            <img src={course} alt="course-logo" />
          </div>
        </LightSpeed>
      </div>
    );
  } else {
    return (
      <div className="course-body">
        <div className="course-final-body-review">
          {props.reviews.length === 0 ? (
            <h1 className="course-body-description">No Reviews</h1>
          ) : (
            props.reviews.map(review => (
              <Reviewcard
                title={review.title}
                rating={review.rating}
                content={review.description}
                date={moment(review.createdAt).format("h:mm a, Do MMM YYYY")}
                reviewUsername={review.username}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

function titleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
