import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import { Dashboard } from "./components/dashboard";
import UserMainPage from "./components/pages/UserMainPage/UserMainPage";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div>
                <Dashboard>something</Dashboard>
            </div>
        );
    }
}

export default App;
