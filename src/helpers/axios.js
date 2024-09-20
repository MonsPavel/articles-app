import axios from 'axios';

const baseURL = '';

const axiosInstance = axios.create({
  validateStatus(status) {
    return ((status >= 200) && (status < 300));
  },
  baseURL,
});

export default axiosInstance;
