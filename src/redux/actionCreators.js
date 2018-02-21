// Redux action creators: see actions.js for documentation.
import {
  SET_VIEW,
  GET_PATIENT_LIST,
  RECEIVE_PATIENT_LIST,
  GET_PATIENT_DETAILS,
  RECEIVE_PATIENT_DETAILS,
  GET_APPOINTMENT_LIST,
  RECEIVE_APPOINTMENT_LIST,
  TOGGLE_APPOINTMENT_EXPAND
} from "./actions";

export function setView(view) {
  return { name: SET_VIEW, view };
}

export function getPatientList() {
  return { name: GET_PATIENT_LIST };
}

export function receivePatientList(patients) {
  return { name: RECEIVE_PATIENT_LIST, patients };
}

export function getPatientDetails(patientID) {
  return { name: GET_PATIENT_DETAILS };
}

export function receivePatientDetails({ patientID, appointments, messageCount }) {
  return { name: RECEIVE_PATIENT_DETAILS, patientID, appointments, messageCount };
}

export function getAppointmentList() {
  return { name: GET_APPOINTMENT_LIST };
}

export function receiveAppointmentList(appointments) {
  return { name: RECEIVE_APPOINTMENT_LIST, appointments };
}

export function toggleAppointmentExpand(appointmentID) {
  return { name: TOGGLE_APPOINTMENT_EXPAND, appointmentID };
}
