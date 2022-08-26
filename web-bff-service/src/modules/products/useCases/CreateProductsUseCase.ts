import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ICreateProducts } from '../domain/models/requests/ICreateProducts';
import { IProducts } from '../domain/models/responses/IProducts';
import AppErrors from '@shared/errors/AppErrors';

@injectable()
export default class CreateProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateProducts): Promise<IProducts> {
    const product = await this.productsRepository.create(data);
    if (!product) {
      throw new AppErrors('Error on create product');
    }
    return product;
  }
}
