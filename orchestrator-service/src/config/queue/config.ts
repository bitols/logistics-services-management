import 'dotenv/config';
export default {
  brokers: [process.env.KAFKA_HOST as string],
  clientId: process.env.KAFKA_CLIENT_ID as string,
  storageCapacityTopic: process.env.STORAGE_CAPACITY_TOPIC as string,
  storageProductTopic: process.env.STORAGE_PRODUCT_TOPIC as string,
  storageLocationTopic: process.env.STORAGE_LOCATION_TOPIC as string,
  receiverLocationTopic: process.env.RECEIVER_LOCATION_TOPIC as string,
  groupId: process.env.KAFKA_GROUP_ID as string,
  maxWaitTimeInMs: process.env.KAFKA_CONSUMER_WAIT_TIME as unknown as number,
};
