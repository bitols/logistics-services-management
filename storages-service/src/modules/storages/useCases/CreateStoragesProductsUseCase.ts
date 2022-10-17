import { inject, injectable } from 'tsyringe';
import { ICreateStorageProducts } from '../domain/models/requests/ICreateStorageProducts';
import { IStorageProductsRepository } from '../domain/repositories/IStoragePorductsRepository';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
import AppErrors from '@shared/errors/AppErrors';

@injectable()
export default class CreateStoragesProductsUseCase {
  constructor(
    @inject('StorageProductsRepository')
    private storageProductsRepository: IStorageProductsRepository,
  ) {}

  public async execute(data: ICreateStorageProducts): Promise<void> {
    try {
      const promises = [];
      for (let index = 0; index < data.quantity; index++) {
        promises.push(
          this.storageProductsRepository.save(
            await this.storageProductsRepository.create(data),
          ),
        );
      }
      Promise.all(promises)
        .then(response => console.log(response))
        .catch(error => console.log(error));

      await queue.produce(
        queueConfig.storageProductTopic,
        JSON.stringify({
          increase: true,
          storedProduct: {
            id: data.productId,
            name: data.name,
            height: data.height,
            width: data.width,
            lenght: data.lenght,
            value: data.value,
            storageId: data.storageId,
            productId: data.productId,
            quantity: data.quantity,
          },
        }),
      );
    } catch (error: any) {
      throw new AppErrors('Error on associate products', 500);
    }
  }
}
