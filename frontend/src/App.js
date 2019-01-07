import React, { Component } from "react";
import logo from "./logo.svg";
import { Dashboard } from "./components/dashboard";
import UserMainPage from "./components/pages/UserMainPage/UserMainPage";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Dashboard>
                <UserMainPage />
            </Dashboard>
        );
    }
}

export default App;
