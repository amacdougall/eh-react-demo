// Tests for the data loading functions.

import {
  loadPatientList,
  loadAppointmentList,
  loadPatientDetails
} from "./data";
import _ from "lodash";

const mockPatientList = [
  {
    "id": 1,
    "name": "Robert Baratheon",
    "company": "Westeros Wealth Management"
  },
  {
    "id": 2,
    "name": "John Snow",
    "company": "Night's Watch"
  }
];

const mockAppointments = [
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
];

// actually user_action objects of the message type
const mockMessages = [
  {
    "id": 2,
    "patient_id": 2,
    "action": "message",
    "datetime": "2017-01-01T08:36:29"
  },
  {
    "id": 3,
    "patient_id": 2,
    "action": "message",
    "datetime": "2017-01-01T12:28:22"
  }
];


it("loads the patient list as an array", () => {
  fetch.mockResponse(JSON.stringify(mockPatientList));

  return loadPatientList().then(data => {
    expect(data).toEqual(mockPatientList);
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
