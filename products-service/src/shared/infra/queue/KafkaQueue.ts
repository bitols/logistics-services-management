import { Kafka, Producer } from 'kafkajs';
import kafkaConfig from '@config/kafkaConfig';

export class KafkaQueue {
  private producer: Producer;

  constructor() {
    console.log('kafka brokers: ', kafkaConfig.brokers);
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

    console.log(JSON.stringify(result));
  }
}
