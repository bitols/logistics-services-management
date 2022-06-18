import { Consumer, Kafka } from 'kafkajs';
import { IKafkaQueue } from './queue/IKafkaQueue';
import kafkaConfig from '@config/kafkaConfig';
export class KafkaQueue implements IKafkaQueue {
  private kafka: Kafka;

  constructor() {
    this.kafka = new Kafka({
      clientId: kafkaConfig.clientId,
      brokers: kafkaConfig.brokers,
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async startConsumer(topic: string, callback: Function): Promise<void> {
    try {
      console.log(`KafkaQueue.startConsumer: ${topic}`);
      const consumer = this.kafka.consumer({
        groupId: topic,
        maxWaitTimeInMs: kafkaConfig.maxWaitTimeInMs,
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
