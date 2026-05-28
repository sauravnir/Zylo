import axios from "axios";

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_APP_URL ||'http://localhost:8000/api',
    timeout: 5000, // If the server doesnt send any response within 5 secs , then aborts connection
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials: true // This allows cookies to be sent with requests, enabling session management and authentication features.
});
export default axiosInstance;