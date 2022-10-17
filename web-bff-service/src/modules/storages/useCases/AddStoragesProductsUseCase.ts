import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IAddStorageProducts } from '../domain/models/requests/IAddStorageProduct';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class AddStoragesProductsUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IAddStorageProducts): Promise<void> {
    const product = await this.productsRepository.getById({
      id: data.productId,
    });
    if (!product) {
      throw new AppErrors('Product not Exists');
    }
    try {
      await this.storagesRepository.addProducts({
        productId: product.id,
        name: product.name,
        height: product.height,
        width: product.width,
        lenght: product.lenght,
        value: product.price,
        storageId: data.storageId,
        quantity: data.quantity,
      });
    } catch (error: any) {
      throw new AppErrors('Error on associate products', 500);
    }
  }
}
