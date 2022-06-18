import 'reflect-metadata';
import 'dotenv/config';
import appApiConfig from '@config/appApiConfig';
import { app } from './app';
import { storageCapacityControl } from '@modules/reports/infra/handler/storageCapacityControl.handler';
import kafkaConfig from '@config/kafkaConfig';
import { KafkaQueue } from '../kafka/KafkaQueue';
import 'express-async-errors';
import '@shared/container';
import { container } from 'tsyringe';

const port = appApiConfig.port;

app.listen(port, async () => {
  console.log(`Server started on port ${port}!`);

  const queue = container.resolve(KafkaQueue);
  await queue.startConsumer(
    kafkaConfig.storageCapacityTopic,
    storageCapacityControl,
  );
});
