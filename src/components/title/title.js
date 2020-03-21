import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./title.css";

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Link to="/">
        {" "}
        <h1 className="coblima-title" style={{ color: this.props.color }}>
          COBLIMA
        </h1>{" "}
      </Link>
    );
  }
}

export default Title;
