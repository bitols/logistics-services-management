import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
import { IDeleteProducts } from '../domain/models/requests/IDeleteProducts';

@injectable()
export default class DeleteProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}
  public async execute(data: IDeleteProducts): Promise<void> {
    const product = await this.productsRepository.getById(data.id);

    if (!product) {
      throw new AppErrors('Product not found');
    }

    await this.productsRepository.remove(product);

    await queue.produce(
      queueConfig.storageCapacityTopic,
      JSON.stringify({ id: product.storageId }),
    );
  }
}
