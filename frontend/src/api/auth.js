// src/api/auth.js
import axios from "./axios";

export const loginUser = (data) => axios.post("/login", data);
export const registerUser = (data) => axios.post("/register", data);