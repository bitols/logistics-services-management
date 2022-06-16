import 'reflect-metadata';
import 'dotenv/config';
import appApiConfig from '@config/appApiConfig';
import { app } from './app';
import { KafkaQueue } from '../kafka/KafkaQueue';
import { storageCapacityControl } from '@modules/reports/infra/handler/storageCapacityControl.handler';
import kafkaConfig from '@config/kafkaConfig';
import 'express-async-errors';
import '@shared/container';

const port = appApiConfig.port;

app.listen(port, async () => {
  console.log(`Server started on port ${port}!`);
  const queue = new KafkaQueue();
  await queue.consume(kafkaConfig.storageControlTopic, storageCapacityControl);
});
