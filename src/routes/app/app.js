import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "../../assets/css/bootstrap.css";

import Query from "../query/query";
import Course from "../course/course";
import Home from "../home/home";
import Login from "../login/login";
import Register from "../register/register";
import Profile from "../profile/profile";
import Review from "../review/review";

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/course">
            <Course />
          </Route>
          <Route path="/query">
            <Query />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/review">
            <Review />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
