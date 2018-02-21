import _ from "lodash";

import { initialState, reducer } from "./state";
import { Views } from "./actions";
import {
  setView,
  getPatientList,
  receivePatientList,
  getPatientDetails,
  receivePatientDetails,
  getAppointmentList,
  receiveAppointmentList,
  toggleAppointmentExpand
} from "./actionCreators";

describe("main application reducer", () => {
  it("when called without a state or action, returns the initial state", () => {
    const state = reducer();
    expect(state).toEqual(initialState);
  });

  it("when handling SET_VIEW, it sets the correct view in the state", () => {
    const state = reducer(initialState, setView(Views.APPOINTMENTS));
    expect(state.view).toEqual(Views.APPOINTMENTS);
  });

  it("when handling GET_PATIENT_LIST, it sets patientsLoading true", () => {
    const state = reducer(initialState, getPatientList());
    expect(state.patientsLoading).toBe(true);
  });

  describe("when handling RECEIVE_PATIENT_LIST", () => {
    const mockPatient = {
      id: 1000,
      name: "Beric Dondarrian",
      company: "The Brotherhood Without Banners"
    };

    const incomingPatients = [
      {
        id: 1,
        name: "Tormund Giantsbane",
        company: "Wildlings"
      }
    ];

    const mockState = Object.assign(initialState, {}, {patients: [mockPatient]});
    let state;

    beforeEach(() => {
      state = reducer(mockState, receivePatientList(incomingPatients));
    });

    it("replaces the patient list", () => {
      expect(state.patients).toEqual(incomingPatients);
    });

    it("sets patientsLoading to false", () => {
      expect(state.patientsLoading).toBe(false);
    });
  });

  it("when handling GET_PATIENT_DETAILS, it sets patientDetailsLoading to true", () => {
    const state = reducer(initialState, getPatientDetails(1));
    expect(state.patientDetailsLoading).toBe(true);
  });

  describe("when handling RECEIVE_PATIENT_DETAILS", () => {
    let incomingPatientDetails = {
      patientID: 1,
      appointments: [
        // cribbed from live API
        {
          "id": 16,
          "datetime": "2017-02-21T07:30:00",
          "created_at": "2017-02-17T13:06:49",
          "patient_id": 7,
          "note": "Cancelled"
        },
        {
          "id": 6,
          "datetime": "2017-06-01T12:00:00",
          "created_at": "2017-06-01T07:12:01",
          "patient_id": 2,
          "note": "Minor stab wounds."
        }
      ],
      messageCount: 4
    };

    let state;

    beforeEach(() => {
      state = reducer(initialState, receivePatientDetails(incomingPatientDetails));
    });

    it("should add patient's appointment objects to the appointments list", () => {
      expect(state.appointments).toEqual(incomingPatientDetails.appointments);
    });

    it("should add the patient id as a key in patient details", () => {
      expect(state.patientDetails.hasOwnProperty(incomingPatientDetails.patientID));
    });

    it("should add appointment id list to patient details", () => {
      expect(state.patientDetails[incomingPatientDetails.patientID].appointmentIDs)
        .toEqual(incomingPatientDetails.appointments.map(a => a.id));
    });

    it("should add message count to patient details", () => {
      expect(state.patientDetails[incomingPatientDetails.patientID].messageCount)
        .toEqual(incomingPatientDetails.messageCount);
    });

    it("should set patientDetailsLoading to false", () => {
      expect(state.patientDetailsLoading).toBe(false);
    });
  });

  it("when handling GET_APPOINTMENT_LIST, it sets appointmentsLoading to true", () => {
    const state = reducer(initialState, getAppointmentList());
    expect(state.appointmentsLoading).toBe(true);
  });

  describe("when handling RECEIVE_APPOINTMENT_LIST", () => {
    const mockAppointment = {
      "id": 1000,
      "datetime": "2017-06-01T12:00:00",
      "created_at": "2017-06-01T07:12:01",
      "patient_id": 1,
      "note": "Not a real appointment."
    };

    const incomingAppointments = [
      {
        "id": 1,
        "datetime": "2017-06-01T12:00:00",
        "created_at": "2017-06-01T07:12:01",
        "patient_id": 1,
        "note": "A real appointment... and a real human being."
      }
    ];

    const mockState = Object.assign({}, initialState, {appointments: [mockAppointment]});
    const state = reducer(mockState, receiveAppointmentList(incomingAppointments));
    
    it("replaces the appointment list", () => {
      expect(state.appointments).toEqual(incomingAppointments);
    });

    it("creates appointment details for each appointment", () => {
      expect(_.size(state.appointmentDetails)).toBe(1);
      let details = state.appointmentDetails[incomingAppointments[0].id.toString()];
      expect(details);
      expect(details.expand).toBe(false);
    });

    it("sets appointmentsLoading to false", () => {
      expect(state.appointmentsLoading).toBe(false);
    });
  });

  describe("when handling TOGGLE_APPOINTMENT_EXPAND", () => {
    let mockState;
    
    beforeEach(() => {
      mockState = Object.assign({}, initialState, {
        appointmentDetails: {
          "16": { expand: false }
        }
      });
    });

    it("expands the collapsed", () => {
      const state = reducer(mockState, toggleAppointmentExpand(16));
      expect(state.appointmentDetails["16"]);
      expect(state.appointmentDetails["16"].expand).toBe(true);
    });

    it("collapses the expanded", () => {
      mockState.appointmentDetails["16"].expand = true;
      const state = reducer(mockState, toggleAppointmentExpand(16));
      expect(state.appointmentDetails["16"]);
      expect(state.appointmentDetails["16"].expand).toBe(false);
    });
  });
});
