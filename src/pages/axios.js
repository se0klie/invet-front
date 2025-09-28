import axios from "axios";

const axios_api = axios.create({
  baseURL: "https://backendinvet.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

export default axios_api;
