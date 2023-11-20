import axios from 'axios';

const API_URL = 'http://localhost:8080/api/happyman/participant';

export const createParticipant = async (form) => {
    const response = await axios.post(API_URL, form);
    return response.data;
};

export const modifyParticipant = async (id, form) => {
    const response = await axios.patch(`${API_URL}/${id}`, form);
    return response.data;
};

export const deleteParticipant = async (ids) => {
    const response = await axios.delete(API_URL, { data: { ids } });
    return response.data;
};

export const getParticipant = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};
