const PATIENTS_URL = "https://eden-interview-api.herokuapp.com/patients";
const APPOINTMENTS_URL = "https://eden-interview-api.herokuapp.com/appointments";
const PATIENT_APPOINTMENTS_URL = "https://eden-interview-api.herokuapp.com/appointments?patiend_id=:patient_id";
const MESSAGES_URL = "https://eden-interview-api.herokuapp.com/user_actions?patient_id=:patient_id&action=message";

/**
 * Load the list of patients from the data source.
 *
 * @return {Promise} - A promise which resolves with an Array of patients.
 */
export function loadPatientList() {
  return fetch(PATIENTS_URL).then(response => response.json());
}

/**
 * Load the list of appointments from the data source.
 *
 * @return {Promise} - A promise which resolves with an Array of appointments.
 */
export function loadAppointmentList() {
  return fetch(APPOINTMENTS_URL).then(response => response.json());
}

/**
 * Loads details for a single patient, by id.
 *
 * @param {Number} patientID - The numeric id of the patient.
 * @return {Promise} - A promise which resolves with an { appointments, messageCount } object.
 */
export function loadPatientDetails(patientID) {
  return Promise.all([
    fetch(PATIENT_APPOINTMENTS_URL.replace(":patient_id", patientID)).then(response => response.json()),
    fetch(MESSAGES_URL.replace(":patient_id", patientID)).then(response => response.json())
  ]).then(([appointments, messages]) => {
    return Promise.resolve({ appointments, messageCount: messages.length });
  });
}
