// Redux action creators: see actions.js for documentation.
import {
  SET_VIEW,
  GET_PATIENTS,
  RECEIVE_PATIENTS,
  GET_PATIENT_DETAILS,
  RECEIVE_PATIENT_DETAILS,
  GET_APPOINTMENTS,
  RECEIVE_APPOINTMENTS,
  TOGGLE_APPOINTMENT_EXPAND
} from "./actions";

import {
  loadPatients,
  loadPatientDetails,
  loadAppointments
} from "../data";

export function setView(view) {
  return { type: SET_VIEW, view };
}

export function getPatients() {
  return dispatch => {
    dispatch({ type: GET_PATIENTS });
    return loadPatients().then(patients => {
      dispatch({ type: RECEIVE_PATIENTS, patients });
    });
  };
}

export function getPatientDetails(patientID) {
  return dispatch => {
    dispatch({ type: GET_PATIENT_DETAILS, patientID: patientID });
    return loadPatientDetails(patientID).then(details => {
      dispatch(Object.assign({ type: RECEIVE_PATIENT_DETAILS }, details));
    });
  };
}

export function getAppointments() {
  return dispatch => {
    dispatch({ type: GET_APPOINTMENTS });
    return loadAppointments().then(appointments => {
      dispatch({ type: RECEIVE_APPOINTMENTS, appointments });
    });
  };
}

export function receiveAppointments(appointments) {
  return { type: RECEIVE_APPOINTMENTS, appointments };
}

export function toggleAppointmentExpand(appointmentID) {
  return { type: TOGGLE_APPOINTMENT_EXPAND, appointmentID };
}
