import 'reflect-metadata';
import 'dotenv/config';
import appConfig from '@config/app/config';
import { app } from './app';
import { dataSource } from '../../../config/orm';
import queue from '@config/queue';

const port = appConfig.port;

dataSource
  .initialize()
  .then(() => {
    console.log(`Data Source initialized!`);

    queue
      .init()
      .then(() => {
        console.log(`Queue initialized!`);

        app.listen(port, () => {
          console.log(`Server started on port ${port}!`);
        });
      })
      .catch(error => {
        console.error(error);
      });
  })
  .catch(error => {
    console.error(error);
  });
