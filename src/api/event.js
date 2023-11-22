import axiosInstance from "../utils/axios";

const apiUrl = "http://localhost:8080/api/happyman/admin/event";

// Create Event
export const createEvent = async (eventForm) => {
  const response = await axiosInstance.post(apiUrl, eventForm);
  return response.data;
};

// Update Event
export const updateEvent = async (id, eventForm) => {
  const response = await axiosInstance.patch(`${apiUrl}/${id}`, eventForm);
  return response.data;
};

// Delete Event
export const deleteEvent = async (id) => {
  const response = await axiosInstance.delete(`${apiUrl}/${id}`);
  return response.data;
};

// Get All Events
export const getAllEvents = async () => {
  const response = await axiosInstance.get(apiUrl);
  return response;
};

// Get Single Event
export const getSingleEvent = async (id) => {
  const response = await axiosInstance.get(`${apiUrl}/${id}`);
  return response.data;
};

// Update IsOpen
export const updateIsOpen = async (id, eventForm) => {
    const response = await axiosInstance.patch(`http://localhost:8080/api/happyman/admin/updateIsOpen/${id}`, eventForm);
    return response.data;
};
