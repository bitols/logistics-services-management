import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IUpdateProducts } from '../domain/models/requests/IUpdateProducts';
import { IProducts } from '../domain/models/responses/IProducts';

@injectable()
export default class UpdateProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IUpdateProducts): Promise<IProducts> {
    const product = await this.productsRepository.getById(data.id);

    if (!product) {
      throw new AppErrors('Product not found');
    }

    const storedProduct = await this.productsRepository.getByName(
      product.senderId,
      data.name,
    );

    if (storedProduct && storedProduct.id === product.id) {
      throw new AppErrors('Product already exists');
    }

    product.name = data.name;
    product.price = data.price;
    product.height = data.height;
    product.lenght = data.lenght;
    product.width = data.width;
    product.price = data.price;

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
