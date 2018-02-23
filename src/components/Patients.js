import React, { Component } from "react";
import PatientList from "./PatientList";
import PatientDetails from "./PatientDetails";
import "./Patients.css";

export default class Patients extends Component {
  render() {
    return (
      <div className="Patients">
        <PatientList/>
        <PatientDetails/>
      </div>
    );
  }
}
