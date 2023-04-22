import axios from "axios";
import axiosInstance from "./axios.js";


const API_GET_USERINFO = async (userCredentials) => {
    try {
        const resp = await axiosInstance.get('/userInfo', userCredentials);
        return resp;
    } catch (err) {
        console.log(err)
        throw err
    }
}

export { API_GET_USERINFO };