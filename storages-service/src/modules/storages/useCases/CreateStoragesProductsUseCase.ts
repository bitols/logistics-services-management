import { inject, injectable } from 'tsyringe';
import { ICreateStorageProducts } from '../domain/models/requests/ICreateStorageProducts';
import { IStorageProducts } from '../domain/models/responses/IStorageProducts';
import { IStorageProductsRepository } from '../domain/repositories/IStoragePorductsRepository';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';

@injectable()
export default class CreateStoragesProductsUseCase {
  constructor(
    @inject('StorageProductsRepository')
    private storageProductsRepository: IStorageProductsRepository,
  ) {}

  public async execute(
    data: ICreateStorageProducts,
  ): Promise<IStorageProducts> {
    const product = await this.storageProductsRepository.create(data);

    await this.storageProductsRepository.save(product);

    await queue.produce(
      queueConfig.storageCapacityTopic,
      JSON.stringify({ id: product.storageId }),
    );

    return {
      id: product.id,
      name: product.name,
      value: product.value,
      height: product.height,
      lenght: product.lenght,
      width: product.width,
      productId: product.productId,
      storageId: product.storageId,
    };
  }
}
