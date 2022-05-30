import { inject, injectable } from 'tsyringe';
import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ICreateProductUseCase } from '../domain/useCases/ICreateProductsUseCase';

@injectable()
export default class CreateProductsUseCase implements ICreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    data: ICreateProductsRequest,
  ): Promise<IProductsResponse> {
    const product = await this.productsRepository.create(data);

    await this.productsRepository.save(product);

    return product as IProductsResponse;
  }
}
