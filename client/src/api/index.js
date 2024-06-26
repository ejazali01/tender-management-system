import axios from 'axios';

const API_URL = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // This line ensures that credentials are included in every request
});

API_URL.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API_URL;