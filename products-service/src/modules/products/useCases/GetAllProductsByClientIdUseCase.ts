import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetAllProductsByClientIdRequest } from '../domain/models/requests/IGetAllProductsByClientIdRequest';
import { IProductsResponse } from '../domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IGetAllProductsByClientIdUseCase } from '../domain/useCases/IGetAllProductsByClientIdUseCase';

@injectable()
export default class GetAllProductsByClientIdUseCase
  implements IGetAllProductsByClientIdUseCase
{
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    data: IGetAllProductsByClientIdRequest,
  ): Promise<IProductsResponse[]> {
    const products = await this.productsRepository.getAllByClient(
      data.clientId,
    );

    if (!products.length) {
      throw new AppErrors('Products not found');
    }

    return products.map(product => product as IProductsResponse);
  }
}
