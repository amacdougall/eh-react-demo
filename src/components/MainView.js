import React, { Component } from "react";
import { connect } from "react-redux";
import { Views } from "../redux/actions";
import Patients from "./Patients";
import AppointmentList from "./AppointmentList";
import "./MainView.css";

class MainView extends Component {
  render() {
    if (this.props.view === Views.PATIENTS) {
      return (
        <Patients/>
      );
    } else {
      return (
        <AppointmentList/>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    view: state.view
  }
};

export default connect(mapStateToProps)(MainView);
