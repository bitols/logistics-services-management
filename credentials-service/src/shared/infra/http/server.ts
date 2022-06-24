import 'reflect-metadata';
import 'dotenv/config';
import appApiConfig from '@config/appApiConfig';
import { app } from './app';
import { dataSource } from '../typeorm';
const port = appApiConfig.port;

dataSource
  .initialize()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`Server started on port ${port}!`);
    });
  })
  .catch(error => {
    console.log(error);
  });
