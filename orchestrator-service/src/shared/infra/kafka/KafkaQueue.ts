import { Consumer } from 'kafkajs';
import { IKafkaQueue } from './queue/IKafkaQueue';
import consumer from '.';
export class KafkaQueue implements IKafkaQueue {
  private consumer: Consumer;

  constructor() {
    this.consumer = consumer;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async startConsumer(topic: string, callback: Function): Promise<void> {
    try {
      console.log(`KafkaQueue.startConsumer: ${topic}`);

      await this.consumer.connect();
      await this.consumer.subscribe({ topic });

      await this.consumer.run({
        eachMessage: async ({ message }) => {
          callback(message.value?.toString());
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}