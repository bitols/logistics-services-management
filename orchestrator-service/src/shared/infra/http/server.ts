import 'reflect-metadata';
import 'dotenv/config';
import appConfig from '@config/appConfig';
import { app } from './app';
import kafkaConfig from '@config/kafkaConfig';
import { KafkaQueue } from '../kafka/KafkaQueue';
import { storageLocation } from '@modules/storages/infra/handler/storageLocation.handler';
import { storageCapacityControl } from '@modules/reports/infra/handler/storageCapacityControl.handler';

const port = appConfig.port;

app.listen(port, async () => {
  console.log(`Server started on port ${port}!`);

  const queue = new KafkaQueue();

  await queue.startConsumer(
    kafkaConfig.storageCapacityTopic,
    storageCapacityControl,
  );
  await queue.startConsumer(kafkaConfig.storageLocationTopic, storageLocation);
});
