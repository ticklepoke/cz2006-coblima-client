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
      reviews: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://35.240.245.213/api/v1/courses/" +
          this.props.location.state.course._id
      )
      .then(res => {
        this.setState({ course: res.data.data });
        console.log(res.data.data._id);
        axios
          .get(
            "http://35.240.245.213/api/v1/courses/" +
              res.data.data._id +
              "/reviews"
          )
          .then(res => {
            this.setState({ reviews: res.data.data });
            console.log(res.data.data);
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

  // searchCourse(term) {
  //   axios
  //     .get("http://35.240.245.213/api/v1/courses", {
  //       params: {
  //         search: term
  //       }
  //     })
  //     .then(res => {
  //       console.log(res);
  //       alert("Search Results: " + res.data.data[0].title.toLowerCase());
  //     })
  //     .catch(err => {
  //       console.log(err.response.body.data);
  //     });
  // }

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
          />
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
  if (props.isDisplayReview === false) {
    return (
      <div className="course-header-right">
        <Activetile
          image={ActiveRating}
          number={"4.6 / 5"}
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
            number={"4.6 / 5"}
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
              date={review.createdAt}
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
