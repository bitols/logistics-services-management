import kafkaConfig from '@config/kafkaConfig';
import { IProductsQueue } from '@modules/products/domain/queues/IProductsQueue';
import producer from '@shared/infra/kafka';

export class ProductsQueue implements IProductsQueue {
  public async produceStoragesCapacity(storageId: string): Promise<void> {
    await producer.connect();
    const result = await producer.send({
      topic: kafkaConfig.storageControlTopic,
      messages: [{ value: JSON.stringify({ id: storageId }) }],
    });

    console.log(
      `ProductsQueue.produceStoragesCapacity${JSON.stringify(result)}`,
    );
  }
}
