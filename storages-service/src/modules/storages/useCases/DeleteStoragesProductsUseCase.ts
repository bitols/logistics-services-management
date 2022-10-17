import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IStorageProductsRepository } from '../domain/repositories/IStoragePorductsRepository';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
import { IStorageProduct } from '../domain/models/entities/IStorageProduct';
import { IDeleteStorageProducts } from '../domain/models/requests/IDeleteStorageProducts';

@injectable()
export default class DeleteStoragesproductsUseCase {
  constructor(
    @inject('StorageProductsRepository')
    private storageProductsRepository: IStorageProductsRepository,
  ) {}

  public async execute(data: IDeleteStorageProducts): Promise<void> {
    try {
      let storagesProducts =
        await this.storageProductsRepository.getAllByStorages(data.storageId);
      storagesProducts = storagesProducts.filter(
        product => product.productId === data.productId,
      );

      if (storagesProducts.length) {
        let storageProduct: IStorageProduct;
        const promises = [];
        for (let index = 0; index < data.quantity; index++) {
          storageProduct = storagesProducts[index];
          promises.push(this.storageProductsRepository.remove(storageProduct));
        }

        Promise.all(promises)
          .then(response => console.log(response))
          .catch(error => console.log(error));

        await queue.produce(
          queueConfig.storageProductTopic,
          JSON.stringify({
            increase: false,
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
      }
    } catch (error: any) {
      throw new AppErrors('Error on remove products', 500);
    }
  }
}
