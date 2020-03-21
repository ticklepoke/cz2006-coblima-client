import React from "react";
import "./inputbar.css";

class Inputbar extends React.Component {
  render() {
    return (
      <div className="input-bar" style={this.props.inputbarStyle}>
        <input
          type={this.props.type || "text"}
          className="input-text"
          // value={this.state.value}
          name={this.props.name}
          onChange={this.props.changeInput}
          placeholder={this.props.text}
          disabled={this.props.disabled}
        />
      </div>
    );
  }
}

export default Inputbar;
