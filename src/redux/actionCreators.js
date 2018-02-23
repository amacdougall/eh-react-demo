// Redux action creators: see actions.js for documentation.
import {
  SET_VIEW,
  GET_PATIENTS,
  RECEIVE_PATIENTS,
  VIEW_PATIENT_DETAILS,
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

export function viewPatientDetails(patientID) {
  return (dispatch, getState) => {
    dispatch({ type: VIEW_PATIENT_DETAILS, patientID });

    const details = getState().patientDetails;
    if (details[patientID.toString()] == null) {
      return dispatch(getPatientDetails(patientID));
    }
  };
}

export function getPatientDetails(patientID) {
  return dispatch => {
    dispatch({ type: GET_PATIENT_DETAILS, patientID });
    return loadPatientDetails(patientID).then(details => {
      dispatch(Object.assign({ type: RECEIVE_PATIENT_DETAILS, patientID }, details));
    });
  };
}

export function getAppointments() {
  return (dispatch, getState) => {
    if (getState().patients.length > 0) {
      dispatch({ type: GET_APPOINTMENTS });
      return loadAppointments().then(appointments => {
        dispatch({ type: RECEIVE_APPOINTMENTS, appointments });
      });
    } else {
      dispatch({ type: GET_PATIENTS });
      dispatch({ type: GET_APPOINTMENTS });
      // if we have not loaded patients yet, do it now
      return Promise.all([
        loadPatients(),
        loadAppointments()
      ]).then(([patients, appointments]) => {
        dispatch({ type: RECEIVE_PATIENTS, patients });
        dispatch({ type: RECEIVE_APPOINTMENTS, appointments });
      })
    }
  };
}

export function toggleAppointmentExpand(appointmentID) {
  return { type: TOGGLE_APPOINTMENT_EXPAND, appointmentID };
}
