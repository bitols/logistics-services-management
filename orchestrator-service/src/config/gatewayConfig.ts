import 'dotenv/config';

export default {
  productsService: {
    address: process.env.API_PRODUCTS_ADDRESS as string,
  },
  reportsService: {
    address: process.env.API_REPORTS_ADDRESS as string,
  },
  storagesService: {
    address: process.env.API_STORAGES_ADDRESS as string,
  },
};
