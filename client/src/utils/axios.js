import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.3:5001/",
});

export default instance;
