import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import classNames from "classnames";
import { getAppointments, toggleAppointmentExpand } from "../redux/actionCreators";
import "./AppointmentList.css"

class AppointmentList extends Component {
  componentDidMount() {
    this.props.getAppointments();
  }

  render() {
    if (this.props.appointmentsLoading) {
      return (
        <div className="AppointmentList">
          Loading appointments...
        </div>
      );
    } else {
      const getAppointmentListEntry = a => {
        return (
          <div className="AppointmentList-entry" key={a.id}>
            <div className="AppointmentList-entry-data-row"
                 onClick={() => this.props.toggleAppointmentExpand(a.id)}>
              <div>{a.id}</div>
              <div>{a.patientName}</div>
              <div>{moment(a.datetime).format("MMMM Do YYYY, h:mm a")}</div>
              <div>{moment(a.created_at).format("MMMM Do YYYY, h:mm a")}</div>
            </div>
            <div className={classNames({"AppointmentList-entry-note": true, "hidden": !a.expand})}>
              {a.note}
            </div>
          </div>
        );
      };

      return (
        <div className="AppointmentList">
          <div className="AppointmentList-headings">
            <div>ID</div>
            <div>Patient</div>
            <div>Date/Time</div>
            <div>Created</div>
          </div>
          <div className="AppointmentList-entries">
            {this.props.appointmentsData.map(getAppointmentListEntry)}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, props) => {
  const patientNames = state.patients.reduce((hash, p) => {
    return Object.assign({}, hash, { [p.id.toString()]: p.name });
  }, {});
  const appointmentsData = state.appointments.map(a => {
    return Object.assign({}, a, {
      patientName: patientNames[a.patient_id.toString()],
      expand: state.appointmentDetails[a.id.toString()].expand
    });
  });

  return { appointmentsData };
};

const mapDispatchToProps = dispatch => {
  return {
    getAppointments: () => dispatch(getAppointments()),
    toggleAppointmentExpand: appointmentID => dispatch(toggleAppointmentExpand(appointmentID))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList);
