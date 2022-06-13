import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteProductsRequest } from '@shared-types/products/domain/models/requests/IDeleteProductsRequest';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IDeleteProductsUseCase } from '../domain/useCases/IDeleteProductsUseCase';
import kafkaConfig from '@config/kafkaConfig';
import { ProductsQueue } from '../infra/kafka/queues/ProductsQueue';

@injectable()
export default class DeleteProductsUseCase implements IDeleteProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ProductsQueue')
    private productsQueue: ProductsQueue,
  ) {}
  public async execute(data: IDeleteProductsRequest): Promise<void> {
    const product = await this.productsRepository.getById(data.id);

    if (!product) {
      throw new AppErrors('Product not found');
    }

    await this.productsRepository.remove(product);

    await this.productsQueue.produceStoragesCapacity(product.storageId);
  }
}
