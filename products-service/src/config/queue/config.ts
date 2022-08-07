import 'dotenv/config';
export default {
  brokers: [process.env.KAFKA_HOST as string],
  clientId: process.env.KAFKA_CLIENT_ID as string,
  storageCapacityTopic: process.env.STORAGE_CAPACITY_TOPIC as string,
};
