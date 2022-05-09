import AppErrors from '@shared/errors/AppErrors';
import { injectable, inject } from 'tsyringe';
import { IGetAllProductsByDepotIdRequest } from '../domain/models/requests/IGetAllProductsByDepotIdRequest';
import { IProductsResponse } from '../domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IGetAllProductsByDepotIdUseCase } from '../domain/useCases/IGetAllProductsByDepotIdUseCase';

@injectable()
export default class GetAllProductsByDepotIdUseCase
  implements IGetAllProductsByDepotIdUseCase
{
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    data: IGetAllProductsByDepotIdRequest,
  ): Promise<IProductsResponse[]> {
    const products = await this.productsRepository.getAllByDepot(data.depotId);

    if (!products.length) {
      throw new AppErrors('Products not found');
    }

    return products.map(product => product as IProductsResponse);
  }
}
