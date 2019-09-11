import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
// axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers["Access-Control-Allow-Credentials"] = true;
// axios.defaults.headers["Content-Type"] = "application/json";
// axios.defaults.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE, OPTIONS";
// axios.defaults.withCredentials = true;
export default axios;
