import axios from "axios";

const api = axios.create({
  baseURL: "https://api.cometrip.sn/api/",
});

export default api;
