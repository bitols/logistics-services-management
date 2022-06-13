import { inject, injectable } from 'tsyringe';
import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ICreateProductUseCase } from '../domain/useCases/ICreateProductsUseCase';
import { ProductsQueue } from '../infra/kafka/queues/ProductsQueue';

@injectable()
export default class CreateProductsUseCase implements ICreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ProductsQueue')
    private productsQueue: ProductsQueue,
  ) {}

  public async execute(
    data: ICreateProductsRequest,
  ): Promise<IProductsResponse> {
    const product = await this.productsRepository.create(data);

    await this.productsRepository.save(product);

    await this.productsQueue.produceStoragesCapacity(product.storageId);

    return product as IProductsResponse;
  }
}
