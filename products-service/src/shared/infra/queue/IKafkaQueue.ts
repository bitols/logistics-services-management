export interface IKafkaQueue {
  send(topic: string, message: string): Promise<void>;
}
