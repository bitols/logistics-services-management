export interface IKafkaQueue {
  // eslint-disable-next-line @typescript-eslint/ban-types
  consume(topic: string, callback: Function): Promise<void>;
}
