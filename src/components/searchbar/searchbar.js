import React from "react";
import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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
    // alert("A name was submitted: " + this.state.value);
    event.preventDefault();
    if (!this.state.value) {
      return;
    }
    this.props.searchCourse(this.state.value);
    // axios
    //   .get("http://35.240.245.213/api/v1/courses", {
    //     params: {
    //       search: this.state.value
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //     alert("Search Results: " + res.data.data[0].title.toLowerCase());
    //   })
    //   .catch(err => {
    //     console.log(err.response.body.data);
    //   });
  }

  render() {
    return (
      <div className="searchbar-container" style={this.props.searchbarStyle}>
        <form onSubmit={this.handleSubmit} className="searchbar-form">
          <input
            type="text"
            className="search-input-text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder={"Enter course or module code"}
          />
          <button
            type="submit"
            className="submit-logo"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    );
  }
}

export default Searchbar;
