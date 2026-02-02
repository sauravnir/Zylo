import axios from "axios";

const API = axios.create({
    baseURL : 'http://localhost:8000/api',
    timeout: 5000, // If the server doesnt send any response within 5 secs , then aborts connection
    headers:{
        'Content-Type':'application/json'
    }
});
export default API;