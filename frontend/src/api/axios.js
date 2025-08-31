// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5002", // Match your backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;