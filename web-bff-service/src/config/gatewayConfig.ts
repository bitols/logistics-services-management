import 'dotenv/config';

export default {
  productsService: {
    address: process.env.API_PRODUCTS_ADDRESS as string,
  },
  receiversService: {
    address: process.env.API_RECEIVERS_ADDRESS as string,
  },
  reportsService: {
    address: process.env.API_REPORTS_ADDRESS as string,
  },
  sendersService: {
    address: process.env.API_SENDERS_ADDRESS as string,
  },
  storagesService: {
    address: process.env.API_STORAGES_ADDRESS as string,
  },
  suppliersService: {
    address: process.env.API_SUPPLIERS_ADDRESS as string,
  },
  credentialsService: {
    address: process.env.API_CREDENTIALS_ADDRESS as string,
  },
};
