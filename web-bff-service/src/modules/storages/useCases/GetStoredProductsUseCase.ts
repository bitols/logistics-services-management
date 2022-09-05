import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStorages } from '../domain/models/requests/IGetStorages';
import { IStorageProducts } from '../domain/models/responses/IStorageProducts';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class GetStoredProductsUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesGateway: IStoragesRepository,
  ) {}

  public async execute(request: IGetStorages): Promise<IStorageProducts[]> {
    const products = await this.storagesGateway.getProducts(request);

    if (!products) {
      throw new AppErrors('Products not found');
    }

    return products;
  }
}
