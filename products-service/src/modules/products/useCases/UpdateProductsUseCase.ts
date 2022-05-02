import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateProductsRequest } from '../domain/models/requests/IUpdateProductsRequest';
import { IProductsResponse } from '../domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IUpdateProducstUseCase } from '../domain/useCases/IUpdateProductsUseCase';

@injectable()
export default class UpdateProductsUseCase implements IUpdateProducstUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    data: IUpdateProductsRequest,
  ): Promise<IProductsResponse> {
    const product = await this.productsRepository.getById(data.id);

    if (!product) {
      throw new AppErrors('Product not found');
    }

    product.name = data.name;
    product.price = data.price;
    product.height = data.height;
    product.lenght = data.lenght;
    product.width = data.width;
    product.price = data.price;
    product.depotId = data.depotId;

    await this.productsRepository.save(product);

    return {
      id: product.id,
      name: product.name,
      height: product.height,
      width: product.width,
      lenght: product.lenght,
      price: product.price,
      depotId: product.depotId,
    };
  }
}
