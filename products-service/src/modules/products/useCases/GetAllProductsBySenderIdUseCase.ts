import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetAllProductsBySenderId } from '../domain/models/requests/IGetAllProductsBySenderIdt';
import { IProductsResponse } from '../domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class GetAllProductsBySenderIdUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    data: IGetAllProductsBySenderId,
  ): Promise<IProductsResponse[]> {
    const products = await this.productsRepository.getAllBySender(
      data.senderId,
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
