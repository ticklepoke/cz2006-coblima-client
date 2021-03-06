import React, { Component } from "react";
import "./inactivetile.css";

class Coursetile extends Component {
  render() {
    return (
      <div className="inactive-course-header-tile" >
        <img
          className="inactive-course-header-tile-icon"
          src={this.props.image}
          alt="rating-icon"
        />
        <div className="inactive-course-header-tile-score"> {this.props.number} </div>
        <div className="inactive-course-header-tile-caption"> {this.props.caption} </div>
      </div>
    );
  }
}

export default Coursetile;
