import React from "react";
import home from "../../images/home.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Title from "../../components/title/title";

import "./home.css";
import Searchbar from "../../components/searchbar/searchbar";

function App() {
  return (
    <div className="App">
      <img src={home} className="home-image" alt="home" />

      {/* Header Tab */}
      <Title color="white" />
      <div className="buttons">
        <Link to="/register">
          <Button
            variant="primary"
            size="lg"
            className="form-button register-button"
          >
            REGISTER
          </Button>
        </Link>
        <Link to="/login">
          <Button
            variant="secondary"
            size="lg"
            className="form-button login-button"
          >
            LOGIN
          </Button>
        </Link>
      </div>

      <Searchbar
        className="home-searchbar"
        searchbarStyle={{
          "z-index": "1",
          position: "absolute",
          top: "60%",
          left: "30%"
        }}
      />
    </div>
  );
}

export default App;
