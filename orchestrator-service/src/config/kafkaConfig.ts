import 'dotenv/config';
export default {
  brokers: [process.env.KAFKA_HOST as string],
  clientId: process.env.KAFKA_CLIENT_ID as string,
  storageCapacityTopic: process.env.STORAGE_CAPACITY_TOPIC as string,
  groupId: process.env.KAFKA_GROUP_ID as string,
  maxWaitTimeInMs: process.env.KAFKA_CONSUMER_WAIT_TIME as unknown as number,
};
