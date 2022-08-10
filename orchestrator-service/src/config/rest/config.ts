import 'dotenv/config';

const geocodeService = {
  address: process.env.API_GOOGLE_GEOCODE as string,
  key: process.env.API_GOOGLE_GEOCODE_KEY as string,
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

const storagesService = {
  address: process.env.API_STORAGES_ADDRESS as string,
};

export {
  geocodeService,
  productsService,
  receiversService,
  reportsService,
  storagesService,
};
