import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
import { IProducts } from '../domain/models/responses/IProducts';
import { ICreateProducts } from '../domain/models/requests/ICreateProducts';

@injectable()
export default class CreateProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateProducts): Promise<IProducts> {
    const product = await this.productsRepository.create(data);

    await this.productsRepository.save(product);

    await queue.produce(
      queueConfig.storageCapacityTopic,
      JSON.stringify({ id: product.storageId }),
    );

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
