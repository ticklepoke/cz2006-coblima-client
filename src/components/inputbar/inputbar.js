import React from "react";
import "./inputbar.css";
import { Fade } from "react-reveal";

class Inputbar extends React.Component {
  render() {
    return (
      <Fade bottom delay={300}>
        <div className="input-bar" style={this.props.inputbarStyle}>
          <input
            type={this.props.type || "text"}
            className="input-text"
            // value={this.state.value}
            name={this.props.name}
            onChange={this.props.changeInput}
            placeholder={this.props.text}
            disabled={this.props.disabled}
            value={this.props.value}
            maxLength={this.props.maxLength}
            minLength={this.props.minLength}
          />
        </div>
      </Fade>
    );
  }
}

export default Inputbar;
