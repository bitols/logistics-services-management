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
