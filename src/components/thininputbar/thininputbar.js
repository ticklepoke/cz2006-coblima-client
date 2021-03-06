import React from "react";
import "./thininputbar.css";

class ThinInputBar extends React.Component {
  render() {
    return (
      <input
        type={this.props.type || "text"}
        className="thin-input-text"
        name={this.props.name}
        onChange={this.props.changeInput}
        placeholder={this.props.text}
        disabled={this.props.disabled}
      />
    );
  }
}

export default ThinInputBar;
