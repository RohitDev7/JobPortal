import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:5002",
});


const serviceDetailsAPI = axios.create({
  baseURL: "http://localhost:5003",
});

export { serviceDetailsAPI };
export default API;