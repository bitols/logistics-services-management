import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

@injectable()
export default class CreateProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateProductsRequest): Promise<any> {
    return await this.productsRepository.create(data);
  }
}
