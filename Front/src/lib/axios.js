// lib/axios.js
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export default axios;
