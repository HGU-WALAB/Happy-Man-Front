import axiosInstance from "../utils/axios";

const apiUrl = "http://localhost:8080/api/happyman/institution";
const apiUrl2 = "http://localhost:8080/api/happyman/admin/institution";

// Create Institution
export const createInstitution = async (institutionForm) => {
  const response = await axiosInstance.post(apiUrl2, institutionForm);
  return response.data;
};

// Update Institution
export const updateInstitution = async (id, institutionForm) => {
  const response = await axiosInstance.patch(`${apiUrl2}/${id}`, institutionForm);
  return response.data;
};

// Delete Institution
export const deleteInstitution = async (id) => {
  const response = await axiosInstance.delete(`${apiUrl2}/${id}`);
  return response.data;
};

// Get All Institutions
export const getAllInstitutions = async () => {
  const response = await axiosInstance.get(apiUrl);
  return response.data;
};

// Get Single Institution
export const getSingleInstitution = async (id) => {
  const response = await axiosInstance.get(`${apiUrl}/${id}`);
  return response.data;
};
