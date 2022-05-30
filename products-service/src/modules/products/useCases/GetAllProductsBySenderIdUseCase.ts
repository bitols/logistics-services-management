import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetAllProductsBySenderIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsBySenderIdRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IGetAllProductsBySenderIdUseCase } from '../domain/useCases/IGetAllProductsBySenderIdUseCase';

@injectable()
export default class GetAllProductsBySenderIdUseCase
  implements IGetAllProductsBySenderIdUseCase
{
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    data: IGetAllProductsBySenderIdRequest,
  ): Promise<IProductsResponse[]> {
    const products = await this.productsRepository.getAllBySender(
      data.senderId,
    );

    if (!products.length) {
      throw new AppErrors('Products not found');
    }

    return products.map(product => product as IProductsResponse);
  }
}
