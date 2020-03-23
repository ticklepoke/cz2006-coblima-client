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
          wrap="hard"
          rows="10"
          style={{ resize: "none" }}
        />
      </div>
    );
  }
}

export default Textareabar;
