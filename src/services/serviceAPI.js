import { ServiceBase } from './serviceBase'

class ServiceAPI extends ServiceBase {
  constructor(baseURL) {
    super(baseURL)
  };

  login = async (data) => {
    const url = '/account/login';
    const response = await this.service.post(url, data);
    return response;
  };

  register = async (data) => {
    const url = '/account/register';
    const response = await this.service.post(url, data);
    return response;
  };

  getInfoAccount = async (data) => {
    const url = '/account/getInfoAccount';
    const response = await this.service.post(url, data);
    return response;
  };

  getListDoctor = async () => {
    const url = '/doctor/getListDoctor';
    const response = await this.service.get(url);
    return response;
  };

  getListSpecialist = async (data) => {
    const url = '/specialist/getListSpecialist';
    const response = await this.service.post(url, data);
    return response;
  };

  getListDoctorSpecialist = async (data) => {
    const url = '/doctor/getListDoctorSpecialist';
    const response = await this.service.post(url, data);
    return response;
  };

  getAllFacility = async () => {
    const url = '/facility/getAllFacility';
    const response = await this.service.get(url);
    return response;
  };

  searchFacility = async (data) => {
    const url = '/facility/searchFacility';
    const response = await this.service.post(url, data);
    return response;
  };
}

export { ServiceAPI }
