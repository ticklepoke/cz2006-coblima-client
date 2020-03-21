import React, { Component } from "react";
import "./activetile.css";

class Coursetile extends Component {
  render() {
    return (
      <div className="course-header-tile" >
        <img
          className="course-header-tile-icon"
          src={this.props.image}
          alt="rating-icon"
        />
        <div className="course-header-tile-score"> {this.props.number} </div>
        <div className="course-header-tile-caption"> {this.props.caption} </div>
      </div>
    );
  }
}

export default Coursetile;
