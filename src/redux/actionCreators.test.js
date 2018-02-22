import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  mockPatients,
  mockAppointments,
  mockMessages
} from "../mockData";

import {
  GET_PATIENTS,
  RECEIVE_PATIENTS,
  VIEW_PATIENT_DETAILS,
  GET_PATIENT_DETAILS,
  RECEIVE_PATIENT_DETAILS,
  GET_APPOINTMENTS,
  RECEIVE_APPOINTMENTS
} from "./actions";

import {
  getPatients,
  viewPatientDetails,
  getPatientDetails,
  getAppointments
} from "./actionCreators";

import { initialState } from "./state";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

it("getPatients dispatches desired actions", () => {
  const store = mockStore(initialState);
  fetch.mockResponse(JSON.stringify(mockPatients));

  return store.dispatch(getPatients()).then(() => {
    expect(store.getActions()).toEqual([
      { type: GET_PATIENTS },
      { type: RECEIVE_PATIENTS, patients: mockPatients }
    ]);
  });
});

it("viewPatientDetails dispatches load actions when details are not yet available", () => {
  const store = mockStore(initialState);
  fetch.mockResponseOnce(JSON.stringify(mockAppointments));
  fetch.mockResponseOnce(JSON.stringify(mockMessages));

  return store.dispatch(viewPatientDetails(2)).then(() => {
    expect(store.getActions()).toEqual([
      { type: VIEW_PATIENT_DETAILS, patientID: 2 },
      { type: GET_PATIENT_DETAILS, patientID: 2 },
      {
        type: RECEIVE_PATIENT_DETAILS,
        appointments: mockAppointments,
        messageCount: 2
      }
    ]);
  });
});

it("getPatientDetails dispatches desired actions", () => {
  const store = mockStore(initialState);
  fetch.mockResponseOnce(JSON.stringify(mockAppointments));
  fetch.mockResponseOnce(JSON.stringify(mockMessages));

  return store.dispatch(getPatientDetails(2)).then(() => {
    expect(store.getActions()).toEqual([
      { type: GET_PATIENT_DETAILS, patientID: 2 },
      {
        type: RECEIVE_PATIENT_DETAILS,
        appointments: mockAppointments,
        messageCount: 2
      }
    ]);
  });
});

it("getAppointments dispatches desired action", () => {
  const store = mockStore(initialState);
  fetch.mockResponse(JSON.stringify(mockAppointments));

  return store.dispatch(getAppointments()).then(() => {
    expect(store.getActions()).toEqual([
      { type: GET_APPOINTMENTS },
      { type: RECEIVE_APPOINTMENTS, appointments: mockAppointments }
    ]);
  });
});
