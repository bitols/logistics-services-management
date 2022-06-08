import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import kafkaConfig from '@config/kafkaConfig';
import { IKafkaQueue } from './IKafkaQueue';

export class KafkaQueue implements IKafkaQueue {
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      clientId: kafkaConfig.clientId,
      brokers: kafkaConfig.brokers,
    });

    this.consumer = kafka.consumer({ groupId: kafkaConfig.groupId });
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async consume(topic: string, callback: Function): Promise<void> {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic });
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          callback(message.value?.toString());
        },
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
