import 'dotenv/config';
export default {
  brokers: [process.env.KAFKA_HOST as string],
  clientId: process.env.KAFKA_CLIENT_ID as string,
  storageControlTopic: process.env.STORAGE_CONTROL_TOPIC as string,
};
