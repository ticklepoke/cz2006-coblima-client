import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";
import "./course.css";
//images
import ActiveRating from "../../images/active-rating.svg";
import ActiveReview from "../../images/active-review.svg";
// import ActiveCredits from "../../images/active-credits.svg"; // not used at all at the moment
import InactiveRating from "../../images/inactive-rating.svg";
import InactiveReview from "../../images/inactive-review.svg";
import InactiveCredits from "../../images/inactive-credits.svg";
import course from "../../images/course.svg";
import moment from "moment";
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
            let reviewData = res.data.data;
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
    console.log("Toggling now, current:" + currentIsDiplayReview);
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
            let reviewData = res.data.data;
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
        // console.log(res.data.data);
        // alert("Search Results: " + res.data.data[0].title.toLowerCase());
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
          style={{
            cursor: "pointer",
            backgroundColor: "#fff",
            width: "100%",
            fontSize: 30
          }}
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
        <div className="course-navbar">
          <Title />
          <Searchbar
            className="course-searchbar"
            searchbarStyle={{
              position: "fixed",
              top: "30px",
              left: "350px",
              padding: "10px 30px",
              width: "45%"
            }}
            searchTerm={this.searchTerm}
          />
          {this.state.searchResults.length === 0 ? (
            <div
              style={{
                position: "absolute",
                top: "65%",
                left: "19%",
                width: "47%",
                backgroundColor: "white",
                textAlign: "start",
                boxShadow: "2px 2px 3px #777",
                paddingTop: "4%",
                paddingBottom: 10,
                paddingRight: 20,
                paddingLeft: 20,
                borderRadius: "0px 0px 10px 10px",
                opacity: 0,
                transition: "opacity 0.6s",
                zIndex: 99
              }}
            >
              {this.renderSuggestions()}
            </div>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "65%",
                left: "19%",
                width: "47%",
                backgroundColor: "white",
                textAlign: "start",
                boxShadow: "2px 2px 3px #777",
                paddingTop: "4%",
                paddingBottom: 10,
                paddingRight: 20,
                paddingLeft: 20,
                borderRadius: "0px 0px 10px 10px",
                transition: "opacity 0.9s",
                zIndex: 99
              }}
            >
              {this.renderSuggestions()}
            </div>
          )}
          <Status />
        </div>
        <div className="course-header">
          <div className="course-header-left">
            <div className="course-header-title">{titleCase(title)}</div>
            <div className="course-header-bot">
              <div className="course-header-code">{courseCode}</div>
              <Link to="/review" className="no-underline">
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
          <Inactivetile
            image={InactiveReview}
            number={props.reviews.length}
            caption={"Reviews"}
          />
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
          <Inactivetile
            image={InactiveRating}
            number={props.averageReview + " / 5"}
            caption={"Overall Rating"}
          />
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
  console.log(props.reviews);
  if (props.isDisplayReview === false) {
    return (
      <div className="course-body">
        <div className="course-body-left">
          <div className="course-body-description">
            {props.course.description}
          </div>
          <div className="course-body-prereq">
            Course Prerequisites: FE5101 - Derivatives and Fixed Income
          </div>
        </div>
        <div className="course-body-right">
          <img src={course} alt="course-logo" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="course-body">
        <div className="course-body-review">
          {props.reviews.map(review => (
            <Reviewcard
              title={review.title}
              rating={review.rating}
              content={review.description}
              date={moment(review.createdAt).format("h:mm a, Do MMM YYYY")}
            />
          ))}
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
