import axios from "axios";
import type { AxiosInstance } from "axios";
const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // ✅ send cookies
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosInstance;
