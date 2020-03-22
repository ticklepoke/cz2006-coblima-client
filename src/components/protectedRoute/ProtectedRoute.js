import React from "react";
import { Route, Redirect } from "react-router";
import AuthService from "../../services/authService";

const auth = new AuthService("http://35.240.245.213");

export default function ProtectedRoute({ component: Component, ...rest }) {
  const loggedIn = auth.loggedIn();
  console.log(loggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? <Component {...props} /> : <Redirect push to="/" />
      }
    />
  );
}
