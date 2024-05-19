import { ServiceAPI } from "./serviceAPI";

export const defaultServicesManager = {
  serviceAPI: null,
};

export const servicesManager = defaultServicesManager;

export const serviceConfig = () => {
  let api = "";

  if (process.env.REACT_APP_BUILD_MODE === "dev") {
    api = "http://localhost:6262";
  }

  if (process.env.REACT_APP_BUILD_MODE === "production") {
    api = "https://booking-backend-8wf4.onrender.com";
  }

  const serviceAPI = new ServiceAPI(api);
  servicesManager.serviceAPI = serviceAPI;
};
