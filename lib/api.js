// lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // all requests will be prefixed with /api
  withCredentials: true, // important: include cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
