import React from "react";
import "./inputbar.css";



class Inputbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

   

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className="input-bar">
            <input
              type="text"
              className="input-text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder={this.props.text}
            />
      </div>
    );
  }
}

export default Inputbar;
