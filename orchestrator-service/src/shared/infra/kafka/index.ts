import { Kafka } from 'kafkajs';
import kafkaConfig from '@config/kafkaConfig';

const kafka = new Kafka({
  clientId: kafkaConfig.clientId,
  brokers: kafkaConfig.brokers,
});

const consumer = kafka.consumer({
  groupId: kafkaConfig.groupId,
  maxWaitTimeInMs: kafkaConfig.maxWaitTimeInMs,
});

export = consumer;
