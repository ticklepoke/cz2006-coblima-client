import jwtDecode from "jwt-decode";
import axios from "axios";

export default class AuthService {
  domain;
  constructor(domain) {
    this.domain = domain || "http://localhost:5000";
  }

  /**
   * Log in user by calling login api
   * Save token
   * Get profile
   */
  login = (email, password) => {
    return this.fetch(`${this.domain}/api/v1/auth/login`, {
      method: "POST",
      data: { email, password }
    }).then(res => {
      this.setToken(res.data.token);
      //   const user_id = jwtDecode(res.token).id;
      //   const header = retrieveAuthenticationHeader();
      //   console.log(header);
      return this.fetch(`${this.domain}/api/v1/auth/me`, {
        method: "GET"
        // body: JSON.stringify({
        //   user: {
        //     id: user_id
        //   }
        // })
      }).then(res => {
        console.log(res);
        this.setProfile(res.data);
        return Promise.resolve(res.data);
      });
    });
  };

  register = (email, password, name, matriculationNumber) => {
    return this.fetch(`${this.domain}/api/v1/auth/register`, {
      method: "POST",
      data: {
        email,
        password,
        name,
        matriculationNumber
      }
    }).then(res => {
      this.setToken(res.data.token);
      return this.fetch(`${this.domain}/api/v1/auth/me`, {
        method: "GET"
      }).then(res => {
        this.setProfile(res.data);
        return Promise.resolve(res.data);
      });
    });
  };
  /**
   * checks if there is a saved token and if it hasnt expired
   */
  loggedIn() {
    const token = this.getToken();
    // console.log(token)
    return !!token && !this.isTokenExpired(token);
  }

  /**
   * check if token has expired
   * @param token
   */
  isTokenExpired(token) {
    const expiry = jwtDecode(token).exp;
    const d = new Date(0);
    d.setUTCSeconds(expiry);
    const now = new Date();
    return now > d;
  }

  /**
   * saves profile based on data from /api/auth/me
   * @param profile
   */
  setProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
  }

  /**
   * retrieves profile from localstorage
   */
  getProfile = () => {
    const profile = localStorage.getItem("profile");
    return profile ? JSON.parse(localStorage.profile) : {};
  };

  /**
   * saves token to localstorage
   * @param idToken
   */
  setToken(idToken) {
    localStorage.setItem("user_token", idToken);
  }

  /**
   * returns token from local storage
   */
  getToken() {
    return localStorage.getItem("user_token");
  }

  /**
   * Error Response handler
   */
  _checkStatus(response) {
    console.log(response.body.data);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      // error.response = response
      alert(error);
      throw error;
      // return error;
    }
  }

  /**
   * removes token and profile data from localstorage
   */
  logout() {
    localStorage.removeItem("user_token");
    localStorage.removeItem("profile");
  }

  fetch = (url, options) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: null
    };

    if (this.loggedIn()) {
      headers.Authorization = "Bearer " + this.getToken();
    }

    return axios(url, {
      headers,
      ...options
    })
      .then(res => {
        return res;
      })
      .catch(err => alert(err.response.data.error));
  };
}

export const retrieveAuthenticationHeader = () => {
  const token = localStorage.getItem("user_token");
  if (token) {
    return {
      headers: {
        Authorization: "Bearer " + token
      }
    };
  } else {
    return null;
  }
};
