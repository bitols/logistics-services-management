import { Kafka } from 'kafkajs';
import config from './config';

const queue = new Kafka({
  clientId: config.clientId,
  brokers: config.brokers,
});

export const queueProducer = async (
  topic: string,
  message: string,
): Promise<void> => {
  const producer = queue.producer();
  await producer.connect();

  const result = await producer.send({
    topic,
    messages: [{ value: message }],
  });
  console.log(`queue.produce: ${JSON.stringify(result)}`);
};
