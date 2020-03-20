import React, { Component } from "react";
import starFill from "../../images/star-fill.svg";
import starEmpty from "../../images/star-empty.svg";

export class Reviewstars extends Component {
  render() {
    const rating = this.props.rating;
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<img src={starFill} alt="starFill" id={i} />);
    }
    for (let i = 0; i < 5 - rating; i++) {
      stars.push(<img src={starEmpty} alt="starEmpty" id={5 - i} />);
    }
    return <div>{stars}</div>;
  }
}

export default Reviewstars;
