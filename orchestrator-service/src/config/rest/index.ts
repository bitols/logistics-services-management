import axios, { AxiosInstance } from 'axios';

const getHttpClient = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export default { axios, getHttpClient };
