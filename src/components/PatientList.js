import React, { Component } from "react";
import { connect } from "react-redux";
import "./PatientList.css";
import { getPatients, viewPatientDetails } from "../redux/actionCreators";
import classNames from "classnames";

class PatientList extends Component {
  componentDidMount() {
    this.props.getPatients();
  }

  render() {
    if (this.props.patientsLoading) {
      return (
        <div className="PatientList">
          Loading patients...
        </div>
      );
    } else {
      const getPatientListEntry = patient => {
        const selected = this.props.selectedPatientID === patient.id;
        const classes = classNames({
          "patient-list-entry": true,
          "patient-list-entry--selected": selected
        });

        const viewPatientDetails = () => this.props.viewPatientDetails(patient.id);

        return (
          <div
            className={classes}
            key={patient.id}
            onClick={viewPatientDetails}>
            {patient.id}: {patient.name}
          </div>
        );
      };
      return (
        <div className="PatientList">
          {this.props.patients.map(getPatientListEntry)}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    patientsLoading: state.patientsLoading,
    patients: state.patients,
    selectedPatientID: state.selectedPatientID
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPatients: () => dispatch(getPatients()),
    viewPatientDetails: patientID => dispatch(viewPatientDetails(patientID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
