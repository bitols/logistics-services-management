import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProducts } from '../domain/models/responses/IProducts';
import { ICreateProducts } from '../domain/models/requests/ICreateProducts';
import AppErrors from '@shared/errors/AppErrors';

@injectable()
export default class CreateProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: ICreateProducts): Promise<IProducts> {
    const storedProduct = await this.productsRepository.getByName(
      data.senderId,
      data.name,
    );

    if (storedProduct) {
      throw new AppErrors('Product already exists');
    }

    const product = await this.productsRepository.create(data);

    await this.productsRepository.save(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      height: product.height,
      lenght: product.lenght,
      width: product.width,
      senderId: product.senderId,
    };
  }
}
