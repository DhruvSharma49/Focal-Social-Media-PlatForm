import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // match your backend
});



export default API;
