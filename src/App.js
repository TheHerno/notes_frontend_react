import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserModule from "./utils/UserModule";
import Login from "./components/Login";
import Notes from "./components/Notes";
import SingUp from "./components/SignUp";
import Header from "./components/Header";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const requireAuth = (nextState, replace) => {
  if (!UserModule.logged) {
    replace({
      pathname: "/login",
    });
  }
};

const notAllowIfAuth = (nextState, replace) => {
  if (UserModule.logged()) {
    replace({
      pathname: "/notes",
    });
  }
};

const App = () => {
  axios.defaults.baseURL = "http://localhost:3000";
  if (UserModule.logged) {
    axios.defaults.headers = { Authorization: `Bearer ${UserModule.token}` };
  }
  return (
    <Router path="/" component={App}>
      <Header />
      <div className="container mt-3">
        <Route path="/login" exact component={Login} onEnter={notAllowIfAuth} />
        <Route path="/signup" exact component={SingUp} onEnter={notAllowIfAuth} />
        <Route path="/notes" exact component={Notes} onEnter={requireAuth} />
      </div>
    </Router>
  );
};

export default App;
