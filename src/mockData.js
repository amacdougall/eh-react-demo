// mock data usable in unit tests

export const mockPatients = [
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

export const mockAppointments = [
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
export const mockMessages = [
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
