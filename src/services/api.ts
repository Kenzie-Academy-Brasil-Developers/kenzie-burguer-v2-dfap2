import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hamburgueria-kenzie-v2.herokuapp.com',
  timeout: 7000,
});

export default api;
