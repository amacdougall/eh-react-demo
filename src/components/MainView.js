import React, { Component } from "react";
import "./MainView.css";
import PatientList from "./PatientList";
import PatientDetails from "./PatientDetails";

export default class MainView extends Component {
  render() {
    return (
      <div className="MainView">
        <PatientList/>
        <PatientDetails/>
      </div>
    );
  }
}
