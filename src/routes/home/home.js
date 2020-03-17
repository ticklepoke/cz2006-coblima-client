import React from "react";
import home from "../../images/home.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./home.css";
import Searchbar from "../../components/searchbar/searchbar";

function App() {
  return (
    <div className="App">
      <img src={home} className="home-image" alt="home" />

      {/* Header Tab */}
      <h1 className="coblima-header">COBLIMA</h1>
      <Link to="/login">
        <Button
          variant="secondary"
          size="lg"
          className="form-button login-button"
        >
          Login
        </Button>
      </Link>
      <Link to="/register">
        <Button
          variant="primary"
          size="lg"
          className="form-button register-button"
        >
          Register
        </Button>
      </Link>

      <Searchbar className="searchbar" />
    </div>
  );
}

export default App;
