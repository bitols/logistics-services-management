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
    const storageProduct = await this.storageProductsRepository.create(data);

    await this.storageProductsRepository.save(storageProduct);
    await queue.produce(
      queueConfig.storageProductTopic,
      JSON.stringify({
        increase: true,
        storedProduct: {
          id: storageProduct.productId,
          name: storageProduct.name,
          height: storageProduct.height,
          width: storageProduct.width,
          lenght: storageProduct.lenght,
          value: storageProduct.value,
          storageId: storageProduct.storageId,
          productId: storageProduct.productId,
        },
      }),
    );

    return {
      id: storageProduct.id,
      name: storageProduct.name,
      value: storageProduct.value,
      height: storageProduct.height,
      lenght: storageProduct.lenght,
      width: storageProduct.width,
      productId: storageProduct.productId,
      storageId: storageProduct.storageId,
    };
  }
}
