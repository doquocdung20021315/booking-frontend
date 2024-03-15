import { ServiceAPI } from "./serviceAPI";

export const defaultServicesManager = {
  serviceAPI: null,
};

export const servicesManager = defaultServicesManager;

export const serviceConfig = () => {
  const serviceAPI = new ServiceAPI("http://localhost:6262");
  servicesManager.serviceAPI = serviceAPI;
};
