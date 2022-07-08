import AppErrors from '@shared/errors/AppErrors';
import { injectable, inject } from 'tsyringe';
import { IGetAllProductsByStorageId } from '../domain/models/requests/IGetAllProductsByStorageId';
import { IProductsResponse } from '../domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class GetAllProductsByStorageIdUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    data: IGetAllProductsByStorageId,
  ): Promise<IProductsResponse[]> {
    const products = await this.productsRepository.getAllByStorage(
      data.storageId,
    );

    if (!products.length) {
      throw new AppErrors('Products not found');
    }

    return products.map(product => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        height: product.height,
        lenght: product.lenght,
        width: product.width,
        senderId: product.senderId,
        storageId: product.storageId,
      };
    });
  }
}
