import axios from "axios";

const TIMEOUT = 1 * 60 * 100000;

class ServiceBase {
  service = null;
  constructor(baseURL) {
    const service = axios.create({
      headers: {
        csrf: "token",
        "Access-Control-Allow-Origin": "*",
      },
      timeout: TIMEOUT,
      baseURL,
    });
    service.interceptors.request.use(this.requestSuccess);
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  requestSuccess = (config) => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config;
  };

  handleSuccess(response) {
    console.log("Success");
    return response.data;
  }

  handleError = (error) => {
    console.log("error", error);
    return error?.response
      ? Promise.reject(error?.response.data)
      : Promise.reject(error);
  };
}

export { ServiceBase };
