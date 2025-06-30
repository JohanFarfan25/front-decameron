import axios from 'axios';

const axiosIntance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_PREFIX,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default axiosIntance;