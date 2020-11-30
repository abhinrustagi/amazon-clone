import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.3:5001/clone-286bc/us-central1/api",
});

export default instance;
