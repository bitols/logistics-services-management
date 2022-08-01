import 'reflect-metadata';
import 'dotenv/config';
import appConfig from '@config/app/config';
import { app } from './app';
import { KafkaQueue } from '@config/kafka/KafkaQueue';
import { storageLocation } from '@shared/infra/handler/storageLocation.handler';
import { storageCapacityControl } from '@shared/infra/handler/storageCapacityControl.handler';

const port = appConfig.port;
app.listen(port, async () => {
  console.log(`Server started on port ${port}!`);

  const queue = new KafkaQueue();

  await queue.startConsumer(queue.storageCapacityTopic, storageCapacityControl);
  await queue.startConsumer(queue.storageLocationTopic, storageLocation);
});
