import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import { Dashboard } from "./components/dashboard";
import UserMainPage from "./components/pages/UserMainPage/UserMainPage";
import CropMemberPage from "./components/pages/CropMemberPage";
import { LoginRoute, CropMangeRoute } from "routes/LoginRoute";

class App extends Component {
    render() {
        return (
            <div>
                <Dashboard>
                    <LoginRoute exact path="/" component={UserMainPage} />
                    <CropMangeRoute
                        exact
                        path="/cropmember"
                        component={CropMemberPage}
                    />
                </Dashboard>
            </div>
        );
    }
}

export default App;
