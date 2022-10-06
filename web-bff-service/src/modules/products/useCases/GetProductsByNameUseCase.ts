import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetProductsBySender } from '../domain/models/requests/IGetProductsBySender';
import { IProducts } from '../domain/models/responses/IProducts';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class GetProductsBySenderUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IGetProductsBySender): Promise<IProducts[]> {
    const products = await this.productsRepository.getAllByName(data);

    if (!products) {
      throw new AppErrors('Products not found');
    }

    return products;
  }
}
