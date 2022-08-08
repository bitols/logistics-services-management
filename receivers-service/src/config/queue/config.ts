import 'dotenv/config';
export default {
  brokers: [process.env.KAFKA_HOST as string],
  clientId: process.env.KAFKA_CLIENT_ID as string,
  receiverLocationTopic: process.env.RECEIVER_LOCATION_TOPIC as string,
};
