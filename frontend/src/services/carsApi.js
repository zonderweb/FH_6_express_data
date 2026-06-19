import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/cars',
});

export const getCars = () => api.get('/');
export const createCar = (data) => api.post('/', data);
export const updateCar = (id, data) => api.put(`/${id}`, data);
export const deleteCar = (id) => api.delete(`/${id}`);
