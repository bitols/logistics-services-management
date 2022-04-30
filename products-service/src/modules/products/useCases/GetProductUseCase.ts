import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IGetProductRequest } from '../domain/models/requests/IGetProductRequest';
import { IProductResponse } from '../domain/models/responses/IProductResponse';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IGetProductUseCase } from '../domain/useCases/IGetProductUseCase';

@injectable()
export default class GetProductUseCase implements IGetProductUseCase {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute(data: IGetProductRequest): Promise<IProductResponse> {
    const product = await this.productsRepository.getById(data.id);
    if (!product) {
      throw new AppError('Product not found');
    }
    return {
      id: product.id,
      name: product.name,
      height: product.height,
      width: product.width,
      lenght: product.lenght,
      price: product.price,
      depotId: product.depotId,
    };
  }
}
