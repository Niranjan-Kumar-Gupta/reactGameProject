import axios from "axios";
import baseUrl from "./server.js";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json"
    }
});

if(localStorage.getItem("token")){
    var token = localStorage.getItem("token")
    axiosInstance.defaults.headers.common["authorization"] = token;
}

export default axiosInstance;