import 'dotenv/config';

const credentialsService = {
  address: process.env.API_CREDENTIALS_ADDRESS as string,
};

const productsService = {
  address: process.env.API_PRODUCTS_ADDRESS as string,
};

const receiversService = {
  address: process.env.API_RECEIVERS_ADDRESS as string,
};

const reportsService = {
  address: process.env.API_REPORTS_ADDRESS as string,
};

const sendersService = {
  address: process.env.API_SENDERS_ADDRESS as string,
};

const storagesService = {
  address: process.env.API_STORAGES_ADDRESS as string,
};

const suppliersService = {
  address: process.env.API_SUPPLIERS_ADDRESS as string,
};

export {
  credentialsService,
  productsService,
  receiversService,
  reportsService,
  sendersService,
  storagesService,
  suppliersService,
};
