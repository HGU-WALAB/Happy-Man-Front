import axios from 'axios';

const apiUrl = "http://localhost:8080/api/happyman/institution";

// Create Institution
export const createInstitution = async (institutionForm) => {
  const response = await axios.post(apiUrl, institutionForm);
  return response.data;
};

// Update Institution
export const updateInstitution = async (id, institutionForm) => {
  const response = await axios.patch(`${apiUrl}/${id}`, institutionForm);
  return response.data;
};

// Delete Institution
export const deleteInstitution = async (id) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data;
};

// Get All Institutions
export const getAllInstitutions = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

// Get Single Institution
export const getSingleInstitution = async (id) => {
  const response = await axios.get(`${apiUrl}/${id}`);
  return response.data;
};
