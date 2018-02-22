// Redux action type constants

/**
 * Change the main view.
 *
 * {type: "SET_VIEW", view: "patients|appointments"}
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
 * Get the patient list. Once available, RECEIVE_PATIENTS will occur.
 *
 * {type: "GET_PATIENTS"}
 */
export const GET_PATIENTS = "GET_PATIENTS";

/**
 * Receive the patient list.
 *
 * {type: "RECEIVE_PATIENTS", patients: Array}
 */
export const RECEIVE_PATIENTS = "RECEIVE_PATIENTS";

/**
 * Get details for a single patient, by id. Once available,
 * RECEIVE_PATIENT_DETAILS will occur.
 *
 * {type: "GET_PATIENT_DETAILS", patientID: Number}
 */
export const GET_PATIENT_DETAILS = "GET_PATIENT_DETAILS";

/**
 * Receive details for a single patient.
 *
 * {
 *   type: "RECEIVE_PATIENT_DETAILS", 
 *   patientID: Number,
 *   appointments: Array,
 *   messageCount: Number
 * }
 */
export const RECEIVE_PATIENT_DETAILS = "RECEIVE_PATIENT_DETAILS";

/**
 * Get the list of all appointments. Once available, RECEIVE_APPOINTMENTS
 * will occur.
 *
 * {type: "GET_APPOINTMENTS"}
 */
export const GET_APPOINTMENTS = "GET_APPOINTMENTS";

/**
 * Receive the list of all appointments.
 *
 * {type: "RECEIVE_APPOINTMENTS", appointments: Array}
 */
export const RECEIVE_APPOINTMENTS = "RECEIVE_APPOINTMENTS";

/**
 * Toggle expanded state of a single appointment, by ID.
 *
 * {type: "TOGGLE_APPOINTMENT_EXPAND", appointmentID: Number}
 */
export const TOGGLE_APPOINTMENT_EXPAND = "TOGGLE_APPOINTMENT_EXPAND";
