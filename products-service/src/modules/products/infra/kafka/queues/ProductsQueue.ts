import kafkaConfig from '@config/kafkaConfig';
import { IProductsQueue } from '@modules/products/domain/queues/IProductsQueue';
import producer from '@shared/infra/kafka';
import { Producer } from 'kafkajs';

export class ProductsQueue implements IProductsQueue {
  private producer: Producer;

  constructor() {
    this.producer = producer;
  }

  public async produceStoragesCapacity(storageId: string): Promise<void> {
    await this.producer.connect();
    const result = await this.producer.send({
      topic: kafkaConfig.storageControlTopic,
      messages: [{ value: JSON.stringify({ id: storageId }) }],
    });

    console.log(
      `ProductsQueue.produceStoragesCapacity${JSON.stringify(result)}`,
    );
  }
}
