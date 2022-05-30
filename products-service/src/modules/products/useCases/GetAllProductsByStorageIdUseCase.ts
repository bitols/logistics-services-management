import AppErrors from '@shared/errors/AppErrors';
import { injectable, inject } from 'tsyringe';
import { IGetAllProductsByStorageIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsByStoragedRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IGetAllProductsByStorageIdUseCase } from '../domain/useCases/IGetAllProductsByStorageIdUseCase';

@injectable()
export default class GetAllProductsByStorageIdUseCase
  implements IGetAllProductsByStorageIdUseCase
{
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    data: IGetAllProductsByStorageIdRequest,
  ): Promise<IProductsResponse[]> {
    const products = await this.productsRepository.getAllByStorage(
      data.storageId,
    );

    if (!products.length) {
      throw new AppErrors('Products not found');
    }

    return products.map(product => product as IProductsResponse);
  }
}
