import axios, { AxiosInstance } from 'axios';
import { report } from 'process';
import {
  credentialsService,
  productsService,
  receiversService,
  reportsService,
  sendersService,
  storagesService,
  suppliersService,
} from './config';

enum Services {
  Credencials,
  Products,
  Receivers,
  Reports,
  Senders,
  Storages,
  Suppliers,
}

const getBaseUrl = (service: Services): string => {
  switch (service) {
    case Services.Credencials:
      return credentialsService.address;
    case Services.Products:
      return productsService.address;
    case Services.Receivers:
      return receiversService.address;
    case Services.Reports:
      return reportsService.address;
    case Services.Senders:
      return sendersService.address;
    case Services.Storages:
      return storagesService.address;
    case Services.Suppliers:
      return suppliersService.address;
    default:
      throw new Error(`Non-existent service in switch: ${service}`);
  }
};

const getHttpClient = (service: Services): AxiosInstance => {
  const baseURL: string = getBaseUrl(service);
  return axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};

export default { getHttpClient, Services };
