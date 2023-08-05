import Axios from "axios";
import store from "../store";

let baseURL = import.meta.env.VITE_APP_API_ROOT;
let useAppJson = import.meta.env.VITE_APP_USE_JSON_DATA;
if (useAppJson === "true") {
  // Use JSON data in development
  baseURL = "src/data";
}

let axios = Axios.create({
  baseURL: baseURL,
});

axios.interceptors.request.use(
  function (config) {
    if (useAppJson === "true" && !config.url.endsWith(".json")) {
      config.url += ".json";
    }
    config.headers.Authorization = "Bearer " + store.getters.access_token;
    return config;
  },
  function (error) {
    //Do something
    if (error.request) {
      // console.log(error.request);
    }
    console.log("request errror...");
    console.log(error);
    return Promise.reject(error);
  }
);

//Response interceptor
axios.interceptors.request.use(
  function (response) {
    //Do something with response data
    return response;
  },
  function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axios;
