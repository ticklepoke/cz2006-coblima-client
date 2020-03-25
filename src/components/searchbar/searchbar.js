import React, { Fragment } from "react";
import { withRouter } from "react-router";
import "./searchbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });

    if (event.target.name === "value")
      this.props.searchTerm(event.target.value);
  };

  render() {
    return (
      <div className="searchbar-container" style={this.props.searchbarStyle}>
        <form onSubmit={this.handleSubmit} className="searchbar-form">
          <input
            type="text"
            name="value"
            className="search-input-text"
            // value={this.state.value}
            onChange={this.handleChange}
            placeholder={"Enter course or module code"}
          />
          <button
            // type="submit"
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

export default withRouter(Searchbar);
