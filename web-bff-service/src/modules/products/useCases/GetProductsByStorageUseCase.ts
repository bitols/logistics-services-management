import AppErrors from '@shared/errors/AppErrors';
import { injectable, inject } from 'tsyringe';
import { IGetProductsByStorage } from '../domain/models/requests/IGetProductsByStorage';
import { IProducts } from '../domain/models/responses/IProducts';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class GetProductsByStorageUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IGetProductsByStorage): Promise<IProducts[]> {
    const products = await this.productsRepository.getAllByStorage(data);

    if (!products) {
      throw new AppErrors('Products not found');
    }

    return products;
  }
}
