export interface IKafkaQueue {
  // eslint-disable-next-line @typescript-eslint/ban-types
  startConsumer(topic: string, callback: Function): Promise<void>;
}
