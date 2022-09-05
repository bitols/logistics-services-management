import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { ICreateStorageProducts } from '../domain/models/requests/ICreateStorageProducts';
import { IStorageProducts } from '../domain/models/responses/IStorageProducts';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class CreateStoragesProductsUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesGateway: IStoragesRepository,
  ) {}

  public async execute(
    data: ICreateStorageProducts,
  ): Promise<IStorageProducts> {
    const product = await this.storagesGateway.addProducts(data);
    if (!product) {
      throw new AppErrors('Error on add product to storage');
    }
    return product;
  }
}
