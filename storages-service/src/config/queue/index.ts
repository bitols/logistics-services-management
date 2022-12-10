import AppErrors from '@shared/errors/AppErrors';
import { Kafka, Producer } from 'kafkajs';
import config from './config';
let queue: Kafka;
let producer: Producer;

const init = async (): Promise<void> => {
  queue = new Kafka({
    clientId: config.clientId,
    brokers: config.brokers,
  });
};

const produce = async (topic: string, message: string): Promise<void> => {
  if (!queue) {
    console.error('Queue not initialized');
    throw new AppErrors('Queue not initialized', 500);
  }

  if (!producer) {
    producer = queue.producer();
  }
  await producer.connect();

  const result = await producer.send({
    topic,
    messages: [{ value: message }],
  });
};

export default { init, produce };
