// import http from '../../http-common';
import axios from 'axios';
import { baseURL } from '../../index';

const loginPost = (data) => {
  return axios.post(baseURL + 'verify', data);
};

const checkAuth = (token, plant_name) => {
  let data = {
    plant_name: plant_name[0].toUpperCase() + plant_name.slice(1),
  };
  return axios.get(baseURL + 'check_auth/', data, {
    Headers: {
      Authorization: token || null,
    },
  });
};

const sendOTP = (data) => {
  return axios.post(baseURL + '/send_otp', data);
};

export const Auth_Service = {
  loginPost,
  checkAuth,
  sendOTP,
};
