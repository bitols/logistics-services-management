import 'dotenv/config';

const productsService = {
  address: process.env.API_PRODUCTS_ADDRESS as string,
};

const reportsService = {
  address: process.env.API_REPORTS_ADDRESS as string,
};

const storagesService = {
  address: process.env.API_STORAGES_ADDRESS as string,
};

const geocodeService = {
  address: process.env.API_GOOGLE_GEOCODE as string,
  key: process.env.API_GOOGLE_GEOCODE_KEY as string,
};

export { productsService, reportsService, storagesService, geocodeService };
