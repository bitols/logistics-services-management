import AppErrors from '@shared/errors/AppErrors';
import { injectable, inject } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IGetAllProductsByStorageId } from '../domain/models/requests/IGetAllProductsByStorageId';
import { IProducts } from '../domain/models/responses/IProducts';

@injectable()
export default class GetAllProductsByStorageIdUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    request: IGetAllProductsByStorageId,
  ): Promise<IProducts[]> {
    const products = await this.productsRepository.getAllByStorage(request);

    if (!products) {
      throw new AppErrors('Products not found');
    }

    return products;
  }
}
