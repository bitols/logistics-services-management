import AppErrors from '@shared/errors/AppErrors';
import { Kafka } from 'kafkajs';
import config from './config';
let queue: Kafka;

const init = async (): Promise<void> => {
  queue = new Kafka({
    clientId: config.clientId,
    brokers: config.brokers,
  });
};

const consume = async (
  topic: string,
  callback: CallableFunction,
): Promise<void> => {
  if (!queue) {
    throw new AppErrors('Queue not initialized', 500);
  }
  const consumer = queue.consumer({
    groupId: topic,
    maxWaitTimeInMs: config.maxWaitTimeInMs,
  });

  await consumer.connect();
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: async ({ message }) => {
      await callback(message.value?.toString());
    },
  });
};

export default { init, consume };
