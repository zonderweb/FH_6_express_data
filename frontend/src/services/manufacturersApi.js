import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/manufacturers',
});

export const getManufacturers = () => api.get('/');
export const createManufacturer = (data) => api.post('/', data);
export const updateManufacturer = (id, data) => api.put(`/${id}`, data);
export const deleteManufacturer = (id) => api.delete(`/${id}`);
