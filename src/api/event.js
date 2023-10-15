import axios from 'axios';

const apiUrl = "http://localhost:8080/api/happyman/event";

// Create Event
export const createEvent = async (eventForm) => {
  const response = await axios.post(apiUrl, eventForm);
  return response.data;
};

// Update Event
export const updateEvent = async (id, eventForm) => {
  const response = await axios.patch(`${apiUrl}/${id}`, eventForm);
  return response.data;
};

// Delete Event
export const deleteEvent = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};

// Get All Events
export const getAllEvents = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

// Get Single Event
export const getSingleEvent = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};
