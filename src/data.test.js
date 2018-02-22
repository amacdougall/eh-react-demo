// Tests for the data loading functions.

import {
  loadPatients,
  loadAppointments,
  loadPatientDetails
} from "./data";

import {
  mockPatients,
  mockAppointments,
  mockMessages
} from "./mockData.js";

import _ from "lodash";

it("loads the patient list as an array", () => {
  fetch.mockResponse(JSON.stringify(mockPatients));

  return loadPatients().then(data => {
    expect(data).toEqual(mockPatients);
  });
});

it("loads patient details by id", () => {
  fetch.mockResponseOnce(JSON.stringify(mockAppointments));
  fetch.mockResponseOnce(JSON.stringify(mockMessages));

  return loadPatientDetails(2).then(data => {
    expect(data).toEqual({
      appointments: mockAppointments,
      messageCount: 2
    });
  });
});
