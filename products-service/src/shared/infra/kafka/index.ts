import { Kafka } from 'kafkajs';
import kafkaConfig from '@config/kafkaConfig';

const kafka = new Kafka({
  clientId: kafkaConfig.clientId,
  brokers: kafkaConfig.brokers,
});

const producer = kafka.producer();

export = producer;
