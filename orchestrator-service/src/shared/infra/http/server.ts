import 'reflect-metadata';
import 'dotenv/config';
import { KafkaQueue } from '@shared/infra/queue/KafkaQueue';
import { storageControl } from '@modules/indicators/infra/handler/storageControl.handler';
import kafkaConfig from '@config/kafkaConfig';
import 'express-async-errors';
import '@shared/container';

const queue = new KafkaQueue();
queue.consume(kafkaConfig.storageControlTopic, storageControl);
