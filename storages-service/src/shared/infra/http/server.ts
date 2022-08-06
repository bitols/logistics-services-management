import 'reflect-metadata';
import 'dotenv/config';
import appConfig from '@config/app/config';
import { app } from './app';
import { dataSource } from '../../../config/orm';

const port = appConfig.port;

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
