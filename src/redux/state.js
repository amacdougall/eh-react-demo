import {
  SET_VIEW,
  GET_PATIENTS,
  RECEIVE_PATIENTS,
  VIEW_PATIENT_DETAILS,
  GET_PATIENT_DETAILS,
  RECEIVE_PATIENT_DETAILS,
  GET_APPOINTMENTS,
  RECEIVE_APPOINTMENTS,
  TOGGLE_APPOINTMENT_EXPAND,
  Views
} from "./actions";

import _ from "lodash";

/**
 * Initial state of the application.
 *
 * Example state:
 *
 * {
 *   view: "patients",
 *   patientsLoading: false,
 *   patients: [
 *     {
 *       id: 1,
 *       name: "Alice",
 *       company: "Intertech"
 *     }
 *   ],
 *   patientDetailsLoading: false,
 *   patientDetails: {
 *     "1": {
 *       messageCount: 4
 *     }
 *   },
 *   selectedPatientID: 1,
 *   appointmentsLoading: false,
 *   appointments: [
 *     {
 *       id: 1,
 *       patientID: 1,
 *       datetime: "2017-06-01T12:00:00",
 *       createdAt: "2017-03-01T12:00:00",
 *       notes: "..."
 *     },
 *     {
 *       id: 3,
 *       patientID: 1,
 *       datetime: "2017-06-01T12:00:00",
 *       createdAt: "2017-03-01T12:00:00",
 *       notes: "..."
 *     }
 *   ],
 *   appointmentDetails: {
 *     "1": { expand: false },
 *     "3": { expand: true }
 *   }
 * }
 */
// NOTE: we maintain metadata in the separate *Details hashes so that the
// `patients` and `appointments` arrays contain only what came from the server.
// This eliminates possible sources of error, and conforms to the Redux
// recommendation of maximum datastore normalization.
export const initialState = {
  view: Views.PATIENTS,
  patientsLoading: false,
  patients: [], // a list of patient data
  patientDetailsLoading: false,
  patientDetails: {}, // a hash keyed by patient id
  selectedPatientID: Number, // id of the patient chosen from the list
  appointmentsLoading: false,
  appointments: [],
  appointmentDetails: {} // a hash keyed by appointment id
};

/**
 * Main reducer.
 */
export function reducer(state = initialState, action) {
  if (action == null) {
    return state;
  }

  switch (action.type) {
    case SET_VIEW:
      return Object.assign({}, state, { view: action.view });
    case GET_PATIENTS:
      // TODO: side effect
      return Object.assign({}, state, { patientsLoading: true });
    case RECEIVE_PATIENTS:
      return Object.assign({}, state, {
        patientsLoading: false,
        patients: action.patients
      });
    case VIEW_PATIENT_DETAILS:
      return Object.assign({}, state, { selectedPatientID: action.patientID });
    case GET_PATIENT_DETAILS:
      return Object.assign({}, state, { patientDetailsLoading: true });
    case RECEIVE_PATIENT_DETAILS:
      return Object.assign({}, state, {
        // add patient's appointments to the master list in state
        appointments: _.uniqBy([].concat(state.appointments, action.appointments), "id"),
        appointmentDetails: Object.assign(
          {},
          state.appointmentDetails,
          action.appointments.reduce((result, a) => {
            return Object.assign({}, result, { [a.id.toString()]: { expand: false } })
          }, {})
        ),
        patientDetailsLoading: false,
        patientDetails: Object.assign({}, state.patientDetails, {
          [action.patientID.toString()]: { messageCount: action.messageCount }
        })
      });
    case GET_APPOINTMENTS:
      // TODO: side effect
      return Object.assign({}, state, { appointmentsLoading: true });
    case RECEIVE_APPOINTMENTS:
      // it's okay to replace the whole list here, since we aren't paginating (yet)
      return Object.assign({}, state, {
        appointmentsLoading: false,
        appointments: action.appointments,
        // TODO: refactor the common appointmentDetails initialization code used
        // here and in the RECEIVE_PATIENT_DETAILS reduction
        appointmentDetails: Object.assign(
          {},
          state.appointmentDetails,
          action.appointments.reduce((result, a) => {
            return Object.assign({}, result, { [a.id.toString()]: { expand: false } })
          }, {})
        )
      });
    case TOGGLE_APPOINTMENT_EXPAND:
      let key = action.appointmentID.toString();
      if (state.appointmentDetails[key]) {
        // the nested Object.assign calls can be simplified, or at least
        // disentangled, by reducer composition; no need for a refactor yet
        return Object.assign({}, state, {
          appointmentDetails: Object.assign({}, state.appointmentDetails, {
            [key]: { expand: !state.appointmentDetails[key].expand }
          })
        });
      } else {
        return state;
      }
    default:
      return state;
  }
}
