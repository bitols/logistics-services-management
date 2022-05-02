import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetProductsRequest } from '../domain/models/requests/IGetProductsRequest';
import { IProductsResponse } from '../domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IGetProductsUseCase } from '../domain/useCases/IGetProductsUseCase';

@injectable()
export default class GetProductsUseCase implements IGetProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IGetProductsRequest): Promise<IProductsResponse> {
    const product = await this.productsRepository.getById(data.id);
    if (!product) {
      throw new AppErrors('Product not found');
    }
    return product as IProductsResponse;
  }
}
