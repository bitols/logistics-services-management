export interface IKafkaQueue {
  // eslint-disable-next-line @typescript-eslint/ban-types
  startProducer(topic: string, message: string): Promise<void>;
}
