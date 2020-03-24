import React from "react";
import "./textareabar.css";

class Textareabar extends React.Component {
  render() {
    return (
      <div className="textarea-bar" style={this.props.inputbarStyle}>
        <textarea
          type={this.props.type || "text"}
          className="textarea-text"
          name={this.props.name}
          onChange={this.props.changeInput}
          placeholder={this.props.text}
          disabled={this.props.disabled}
          value={this.props.value}
          maxLength={this.props.maxLength}
          wrap="hard"
          rows="10"
          style={{ resize: "none" }}
        />
        <span className="textarea-count">
          Characters Left: {300 - this.props.textCount}
        </span>
      </div>
    );
  }
}

export default Textareabar;
