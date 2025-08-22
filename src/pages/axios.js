// src/api/axios.js
import axios from "axios";

const axios_api = axios.create({
  baseURL: "https://backendinvet.com/api/", 
  headers: {
    "Content-Type": "application/json",
  },
});

axios_api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios_api;
