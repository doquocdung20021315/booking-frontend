import { ServiceBase } from './serviceBase'

class ServiceAPI extends ServiceBase {
  constructor(baseURL) {
    super(baseURL)
  };

  // account api
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

  authenticate = async (data) => {
    const url = '/account/authenticate';
    const response = await this.service.post(url, data);
    return response;
  };

  getInfoAccount = async (data) => {
    const url = '/account/getInfoAccount';
    const response = await this.service.post(url, data);
    return response;
  };

  getInfoAcc = async (data) => {
    const url = '/account/getInfoAcc';
    const response = await this.service.post(url, data);
    return response;
  };

  updateInfoAccount = async (data) => {
    const url = '/account/updateInfoAccount';
    const response = await this.service.put(url, data);
    return response;
  };

  getAllAccountByNotRole = async (data) => {
    const url = '/account/getAllAccountByNotRole';
    const response = await this.service.post(url, data);
    return response;
  };

  getAllAccountByFacilityAndRole = async (data) => {
    const url = '/account/getAllAccountByFacilityAndRole';
    const response = await this.service.post(url, data);
    return response;
  };

  searchAccount = async (data) => {
    const url = '/account/searchAccount';
    const response = await this.service.post(url, data);
    return response;
  };

  createAccount = async (data) => {
    const url = '/account/createAccount';
    const response = await this.service.post(url, data);
    return response;
  };

  deleteAccount = async (data) => {
    const url = '/account/deleteAccount';
    const response = await this.service.delete(url, { data });
    return response;
  };

  // specialist api
  getListSpecialist = async (data) => {
    const url = '/specialist/getListSpecialist';
    const response = await this.service.post(url, data);
    return response;
  };

  addSpecialist = async (data) => {
    const url = '/specialist/addSpecialist';
    const response = await this.service.put(url, data);
    return response;
  };

  deleteSpecialist = async (data) => {
    const url = '/specialist/deleteSpecialist';
    const response = await this.service.put(url, data);
    return response;
  };

  // doctor api
  getListDoctor = async (data) => {
    const url = '/doctor/getListDoctor';
    const response = await this.service.post(url, data);
    return response;
  };

  getListDoctorSpecialist = async (data) => {
    const url = '/doctor/getListDoctorSpecialist';
    const response = await this.service.post(url, data);
    return response;
  };

  getInfoDoctor = async (data) => {
    const url = '/doctor/getInfoDoctor';
    const response = await this.service.post(url, data);
    return response;
  };

  getListDoctorByID = async (data) => {
    const url = '/doctor/getListDoctorByID';
    const response = await this.service.post(url, data);
    return response;
  };

  addDoctor = async (data) => {
    const url = '/doctor/addDoctor';
    const response = await this.service.post(url, data);
    return response;
  };

  deleteDoctor = async (data) => {
    const url = '/doctor/deleteDoctor';
    const response = await this.service.delete(url, { data });
    return response;
  };

  // facility api
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

  getInfoFacility = async (data) => {
    const url = '/facility/getInfoFacility';
    const response = await this.service.post(url, data);
    return response;
  };

  addFacility = async (data) => {
    const url = '/facility/addFacility';
    const response = await this.service.post(url, data);
    return response;
  };

  deleteFacility = async (data) => {
    const url = '/facility/deleteFacility';
    const response = await this.service.delete(url, { data });
    return response;
  };

  modifyFacility = async (data) => {
    const url = '/facility/modifyFacility';
    const response = await this.service.put(url, data);
    return response;
  };

  // appointment api
  book = async (data) => {
    const url = '/appointment/book';
    const response = await this.service.post(url, data);
    return response;
  };

  getAllAppointmentAccount = async (data) => {
    const url = '/appointment/getAllAppointmentAccount';
    const response = await this.service.post(url, data);
    return response;
  };

  getAllAppointmentFacility = async (data) => {
    const url = '/appointment/getAllAppointmentFacility';
    const response = await this.service.post(url, data);
    return response;
  };

  deleteAppointmentAccount = async (data) => {
    const url = '/appointment/deleteAppointmentAccount';
    const response = await this.service.delete(url, { data });
    return response;
  };

  searchAppointment = async (data) => {
    const url = '/appointment/searchAppointment';
    const response = await this.service.post(url, data);
    return response;
  };

  searchAppointmentByObjectId = async (data) => {
    const url = '/appointment/searchAppointmentByObjectId';
    const response = await this.service.post(url, data);
    return response;
  };

  checkAppointment = async (data) => {
    const url = '/appointment/checkAppointment';
    const response = await this.service.put(url, data);
    return response;
  };
}

export { ServiceAPI }
