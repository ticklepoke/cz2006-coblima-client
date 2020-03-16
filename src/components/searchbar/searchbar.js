import React from "react";
import "./searchbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

   

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="searchbar">
        <form onSubmit={this.handleSubmit}>
          <label className="form-label">
            <input
              type="text"
              className="search-input-text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder={"Enter course or module code"}
            />
          </label>
          <button type="submit" className="submit-buttons"><FontAwesomeIcon icon={faSearch} /></button>
        </form>
      </div>
    );
  }
}

export default Searchbar;
