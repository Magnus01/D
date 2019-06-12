import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import DiggitAuth from './auth/diggit-auth';
import App from './App';

const hist = createBrowserHistory();



const auth = new DiggitAuth();

ReactDOM.render(
  <Router history={hist}>
   <App App auth={auth} />
  </Router>,
  document.getElementById("root")
);
