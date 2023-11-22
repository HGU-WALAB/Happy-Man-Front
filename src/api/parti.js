import axiosInstance from "../utils/axios";

const API_URL = 'http://localhost:8080/api/happyman/admin/participant';

export const createParticipant = async (form) => {
    const response = await axiosInstance.post(API_URL, form);
    return response.data;
};

export const modifyParticipant = async (id, form) => {
    const response = await axiosInstance.patch(`${API_URL}/${id}`, form);
    return response.data;
};

export const deleteParticipant = async (ids) => {
  const idsString = ids.join(',');
  const response = await axiosInstance.delete(API_URL, { params: { ids: idsString } });
  return response.data;
};




export const getParticipant = async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
};
