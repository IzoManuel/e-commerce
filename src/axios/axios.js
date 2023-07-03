import Axios from "axios";
import store from "../store";

let axios = Axios.create({
    baseURL: import.meta.env.VITE_APP_API_ROOT,
 });

axios.interceptors.request.use(
    function (config) {
        config.headers.Authorization = 'Bearer ' + store.getters.access_token;
        return config
    },
    function (error) {
        //Do something
        if (error.request) {
            // console.log(error.request);
        }
        console.log("request errror...");
        console.log(error)
        return Promise.reject(error);
    }
);

//Response interceptor
axios.interceptors.request.use(
    function (response) {
        //Do something with response data
        return response
    },
    function (error) {
        if (!error.response) {

            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export default axios;