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

    if (!products) {
      throw new AppErrors('Product not found');
    }

    return products.map(product => ({
      id: product.id,
      name: product.name,
      height: product.height,
      width: product.width,
      lenght: product.lenght,
      price: product.price,
      depotId: product.depotId,
    }));
  }
}
