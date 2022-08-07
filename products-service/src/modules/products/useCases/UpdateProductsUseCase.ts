import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
import { IUpdateProducts } from '../domain/models/requests/IUpdateProducts';
import { IProducts } from '../domain/models/responses/IProducts';

@injectable()
export default class UpdateProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IUpdateProducts): Promise<IProducts> {
    const product = await this.productsRepository.getById(data.id);

    if (!product) {
      throw new AppErrors('Product not found');
    }

    const oldStorageId =
      product.storageId !== data.storageId ? product.storageId : undefined;

    product.name = data.name;
    product.price = data.price;
    product.height = data.height;
    product.lenght = data.lenght;
    product.width = data.width;
    product.price = data.price;
    product.storageId = data.storageId;

    await this.productsRepository.save(product);

    await queue.produce(
      queueConfig.storageCapacityTopic,
      JSON.stringify({ id: product.storageId }),
    );

    if (oldStorageId) {
      await queue.produce(
        queueConfig.storageCapacityTopic,
        JSON.stringify({ id: oldStorageId }),
      );
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      height: product.height,
      lenght: product.lenght,
      width: product.width,
      senderId: product.senderId,
      storageId: product.storageId,
    };
  }
}
