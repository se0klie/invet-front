import axios from "axios";

const axios_api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

function handleUnauthorized() {
  localStorage.clear();
  window.location.href = "/login";
}

axios_api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default axios_api;
