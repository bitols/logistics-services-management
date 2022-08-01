import { Kafka } from 'kafkajs';
import config from './config';

export class KafkaQueue {
  public storageCapacityTopic: string;
  public storageLocationTopic: string;
  private kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
    });
    this.storageCapacityTopic = config.storageCapacityTopic;
    this.storageLocationTopic = config.storageLocationTopic;
  }

  public async startConsumer(
    topic: string,
    callback: CallableFunction,
  ): Promise<void> {
    try {
      console.log(`KafkaQueue.startConsumer: ${topic}`);
      const consumer = this.kafka.consumer({
        groupId: topic,
        maxWaitTimeInMs: config.maxWaitTimeInMs,
      });

      await consumer.connect();
      await consumer.subscribe({ topic });

      await consumer.run({
        eachMessage: async ({ message }) => {
          callback(message.value?.toString());
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
