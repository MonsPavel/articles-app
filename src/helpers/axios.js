import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com';

const axiosInstance = axios.create({
  validateStatus(status) {
    return ((status >= 200) && (status < 300));
  },
  baseURL,
});

export default axiosInstance;
