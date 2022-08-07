import 'reflect-metadata';
import 'dotenv/config';
import appConfig from '@config/app/config';
import { app } from './app';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
import { storageLocation } from '@shared/infra/handler/storageLocation.handler';
import { storageCapacityControl } from '@shared/infra/handler/reportStorageCapacity.handler';

const port = appConfig.port;

queue
  .init()
  .then(async () => {
    console.log(`Queue initialized!`);

    await queue.consume(
      queueConfig.storageCapacityTopic,
      storageCapacityControl,
    );
    await queue.consume(queueConfig.storageLocationTopic, storageLocation);

    app.listen(port, () => {
      console.log(`Server started on port ${port}!`);
    });
  })
  .catch(error => {
    console.log(error);
  });
