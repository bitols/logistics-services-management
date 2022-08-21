import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetProducts } from '../domain/models/requests/IGetProducts';
import { IProducts } from '../domain/models/responses/IProducts';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class GetProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IGetProducts): Promise<IProducts> {
    const product = await this.productsRepository.getById(data);
    if (!product) {
      throw new AppErrors('Product not found');
    }
    return product;
  }
}
