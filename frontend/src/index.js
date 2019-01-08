import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/pages/login";
import RegisterPage from "./components/pages/register";

import { LoginRoute } from "routes/LoginRoute";

ReactDOM.render(
    <Router>
        <div>
            <Switch>
                <Route exact path="/login" component={LoginPage} noLayout />
                <Route
                    exact
                    path="/register"
                    component={RegisterPage}
                    noLayout
                />
                <LoginRoute exact path="/" component={App} />
            </Switch>
        </div>
    </Router>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
