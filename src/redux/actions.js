// Redux action type constants

/**
 * Change the main view.
 *
 * {name: "SET_VIEW", view: "patients|appointments"}
 */
export const SET_VIEW = "SET_VIEW";

/**
 * Permitted values for the state.views property.
 */
export const Views = {
  PATIENTS: "patients",
  APPOINTMENTS: "appointments"
};

/**
 * Get the patient list. Once available, RECEIVE_PATIENT_LIST will occur.
 *
 * {name: "GET_PATIENT_LIST"}
 */
export const GET_PATIENT_LIST = "GET_PATIENT_LIST";

/**
 * Receive the patient list.
 *
 * {name: "RECEIVE_PATIENT_LIST", patients: Array}
 */
export const RECEIVE_PATIENT_LIST = "RECEIVE_PATIENT_LIST";

/**
 * Get details for a single patient, by id. Once available,
 * RECEIVE_PATIENT_DETAILS will occur.
 *
 * {name: "GET_PATIENT_DETAILS", patientID: Number}
 */
export const GET_PATIENT_DETAILS = "GET_PATIENT_DETAILS";

/**
 * Receive details for a single patient.
 *
 * {
 *   name: "RECEIVE_PATIENT_DETAILS", 
 *   patientID: Number,
 *   appointments: Array,
 *   messageCount: Number
 * }
 */
export const RECEIVE_PATIENT_DETAILS = "RECEIVE_PATIENT_DETAILS";

/**
 * Get the list of all appointments. Once available, RECEIVE_APPOINTMENT_LIST
 * will occur.
 *
 * {name: "GET_APPOINTMENT_LIST"}
 */
export const GET_APPOINTMENT_LIST = "GET_APPOINTMENT_LIST";

/**
 * Receive the list of all appointments.
 *
 * {name: "RECEIVE_APPOINTMENT_LIST", appointments: Array}
 */
export const RECEIVE_APPOINTMENT_LIST = "RECEIVE_APPOINTMENT_LIST";

/**
 * Toggle expanded state of a single appointment, by ID.
 *
 * {name: "TOGGLE_APPOINTMENT_EXPAND", appointmentID: Number}
 */
export const TOGGLE_APPOINTMENT_EXPAND = "TOGGLE_APPOINTMENT_EXPAND";
