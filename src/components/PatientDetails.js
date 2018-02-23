import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import "./PatientDetails.css";

class PatientDetails extends Component {
  render() {
    if (this.props.patient && this.props.patientDetails) {
      // mostly borrowed from AppointmentList. An obvious refactoring candidate.
      const getAppointmentListEntry = a => {
        return (
          <div className="PatientDetails-appointment-entry" key={a.id}>
            <div className="PatientDetails-appointment-entry-data-row">
              <div>{a.id}</div>
              <div>{moment(a.datetime).format("MMMM Do YYYY, h:mm a")}</div>
              <div>{moment(a.created_at).format("MMMM Do YYYY, h:mm a")}</div>
            </div>
          </div>
        );
      };

      return (
        <div>
          <h1>Patient Information</h1>
          <div className="PatientDetails-info">
            <div className="PatientDetails-info-heading">ID</div>
            <div className="PatientDetails-info-value">{this.props.patient.id}</div>
            <div className="PatientDetails-info-heading">Name</div>
            <div className="PatientDetails-info-value">{this.props.patient.name}</div>
            <div className="PatientDetails-info-heading">Company</div>
            <div className="PatientDetails-info-value">{this.props.patient.company}</div>
            <div className="PatientDetails-info-heading">Messages</div>
            <div className="PatientDetails-info-value">{this.props.patientDetails.messageCount}</div>
          </div>
          <h2>Appointments</h2>
          <div className="PatientDetails-appointment-headings">
            <div>ID</div>
            <div>Date/Time</div>
            <div>Created</div>
          </div>
          <div className="PatientDetails-appointment-entries">
            {this.props.patientAppointments.map(getAppointmentListEntry)}
          </div>
        </div>
      );
    } else if (this.props.patientDetailsLoading) {
      return (
        <div>
          Loading patient details...
        </div>
      );
    } else {
      return (
        <div>
          <h1>Patient Information</h1>
          <p>Select a patient to view details.</p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  if (state.selectedPatientID) {
    return {
      patient: state.patients.find(p => p.id === state.selectedPatientID),
      patientDetails: state.patientDetails[state.selectedPatientID.toString()],
      patientAppointments: state.appointments.filter(a => a.patient_id === state.selectedPatientID),
      patientDetailsLoading: state.patientDetailsLoading
    };
  }
};

export default connect(mapStateToProps)(PatientDetails);
