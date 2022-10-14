import 'dotenv/config';
export default {
  brokers: [process.env.KAFKA_HOST as string],
  clientId: process.env.KAFKA_CLIENT_ID as string,
  storageLocationTopic: process.env.STORAGE_LOCATION_TOPIC as string,
  storageCapacityTopic: process.env.STORAGE_CAPACITY_TOPIC as string,
  storageProductTopic: process.env.STORAGE_PRODUCT_TOPIC as string,
};
