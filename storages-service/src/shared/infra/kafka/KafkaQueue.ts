import { Producer } from 'kafkajs';
import { IKafkaQueue } from './queue/IKafkaQueue';
import producer from '.';

export class KafkaQueue implements IKafkaQueue {
  private producer: Producer;

  constructor() {
    this.producer = producer;
  }

  public async startProducer(topic: string, message: string): Promise<void> {
    await this.producer.connect();
    const result = await this.producer.send({
      topic,
      messages: [{ value: message }],
    });

    console.log(`KafkaQueue.startProducer: ${JSON.stringify(result)}`);
  }
}
