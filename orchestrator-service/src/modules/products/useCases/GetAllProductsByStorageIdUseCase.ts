import AppErrors from '@shared/errors/AppErrors';
import { injectable, inject } from 'tsyringe';
import { IProductsGateway } from '../domain/gateways/IProductsGateway';
import { IGetAllProductsByStorageId } from '../domain/models/requests/IGetAllProductsByStorageId';
import { IProducts } from '../domain/models/responses/IProducts';

@injectable()
export default class GetAllProductsByStorageIdUseCase {
  constructor(
    @inject('ProductsGateway')
    private productsGateway: IProductsGateway,
  ) {}

  public async execute(
    request: IGetAllProductsByStorageId,
  ): Promise<IProducts[]> {
    const products = await this.productsGateway.getAllByStorage(request);

    if (!products) {
      throw new AppErrors('Products not found');
    }

    return products;
  }
}
