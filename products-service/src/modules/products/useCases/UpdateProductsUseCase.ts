import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateProductsRequest } from '@shared-types/products/domain/models/requests/IUpdateProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IUpdateProducstUseCase } from '../domain/useCases/IUpdateProductsUseCase';
import kafkaConfig from '@config/kafkaConfig';
import { ProductsQueue } from '../infra/kafka/queues/ProductsQueue';

@injectable()
export default class UpdateProductsUseCase implements IUpdateProducstUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ProductsQueue')
    private productsQueue: ProductsQueue,
  ) {}

  public async execute(
    data: IUpdateProductsRequest,
  ): Promise<IProductsResponse> {
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

    await this.productsQueue.produceStoragesCapacity(product.storageId);

    if (oldStorageId) {
      await this.productsQueue.produceStoragesCapacity(oldStorageId);
    }

    return product as IProductsResponse;
  }
}
