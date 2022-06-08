import { Kafka, Producer } from 'kafkajs';
import kafkaConfig from '@config/kafkaConfig';
import { IKafkaQueue } from './IKafkaQueue';

export class KafkaQueue implements IKafkaQueue {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: kafkaConfig.clientId,
      brokers: kafkaConfig.brokers,
    });

    this.producer = kafka.producer();
  }

  public async send(topic: string, message: string): Promise<void> {
    await this.producer.connect();
    const result = await this.producer.send({
      topic,
      messages: [{ value: message }],
    });

    console.log(`KafkaQueue.send${JSON.stringify(result)}`);
  }
}
