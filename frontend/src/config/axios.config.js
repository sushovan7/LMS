import axios from "axios";

// Define the base URL for your API
const axiosInstance = axios.create({
  baseURL: import.meta.VITE_APP_AXIOS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
