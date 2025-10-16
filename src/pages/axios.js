import axios from "axios";

const axios_api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default axios_api;
