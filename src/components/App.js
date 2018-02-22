import React, { Component } from "react";
import "./App.css";
import Navigation from "./Navigation.js";
import MainView from "./MainView.js";

export default class App extends Component {
  render(props) {
    return (
      <div>
        <Navigation />
        <MainView />
      </div>
    );
  }
}
