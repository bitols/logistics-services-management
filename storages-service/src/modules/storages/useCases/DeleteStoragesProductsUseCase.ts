import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteStorages } from '../domain/models/requests/IDeleteStorages';
import { IStorageProductsRepository } from '../domain/repositories/IStoragePorductsRepository';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';

@injectable()
export default class DeleteStoragesproductsUseCase {
  constructor(
    @inject('StorageProductsRepository')
    private storageProductsRepository: IStorageProductsRepository,
  ) {}

  public async execute(data: IDeleteStorages): Promise<void> {
    const storageProduct = await this.storageProductsRepository.getById(
      data.id,
    );

    if (!storageProduct) {
      throw new AppErrors('Product not found');
    }

    await this.storageProductsRepository.remove(storageProduct);

    await queue.produce(
      queueConfig.storageProductTopic,
      JSON.stringify({
        increase: false,
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
  }
}
