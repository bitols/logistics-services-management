import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IStorageProductsRepository } from '../domain/repositories/IStoragePorductsRepository';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
import { IStorageProduct } from '../domain/models/entities/IStorageProduct';
import { IDeleteStorageProducts } from '../domain/models/requests/IDeleteStorageProducts';

@injectable()
export default class DeleteStoragesproductsUseCase {
  private scope = '[DeleteStoragesproductsUseCase]';
  constructor(
    @inject('StorageProductsRepository')
    private storageProductsRepository: IStorageProductsRepository,
  ) {}

  public async execute(data: IDeleteStorageProducts): Promise<void> {
    const method = '[execute]';
    try {
      console.time(
        `[INFO]${this.scope}${method} Register ${JSON.stringify(
          data,
        )} to data base`,
      );
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

        Promise.all(promises).then().catch();

        const queueRmvProduct = {
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
        };

        console.time(
          `[INFO]${this.scope}${method} Produce message ${JSON.stringify(
            queueRmvProduct,
          )} to topic ${queueConfig.storageCapacityTopic}`,
        );
        await queue.produce(
          queueConfig.storageProductTopic,
          JSON.stringify(queueRmvProduct),
        );
        console.timeEnd(
          `[INFO]${this.scope}${method} Produce message ${JSON.stringify(
            queueRmvProduct,
          )} to topic ${queueConfig.storageCapacityTopic}`,
        );
      }

      console.timeEnd(
        `[INFO]${this.scope}${method} Register ${JSON.stringify(
          data,
        )} to data base`,
      );
    } catch (error: any) {
      throw new AppErrors('Error on remove products', 500);
    }
  }
}
