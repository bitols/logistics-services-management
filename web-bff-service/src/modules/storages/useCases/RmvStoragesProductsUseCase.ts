import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteStorageProducts } from '../domain/models/requests/IDeleteStorageProducts';
import { IRmvStorageProduct } from '../domain/models/requests/IRmvStorageProductl';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class RmvStoragesproductsUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IRmvStorageProduct): Promise<void> {
    const product = await this.productsRepository.getById({
      id: data.productId,
    });

    if (!product) {
      throw new AppErrors('Product not Exists');
    }

    if (data.quantity < 1 || data.quantity > 100) {
      throw new AppErrors('Quantity must be between 1 and 100');
    }

    try {
      await this.storagesRepository.rmvProducts({
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
      throw new AppErrors('Error on remove products', 500);
    }

    /*
    let storedProducts = await this.storagesRepository.getProducts({
      id: data.storageId,
    });

    if (!storedProducts) {
      throw new AppErrors('Storage is empty', 400);
    }

    storedProducts = storedProducts.filter(
      storedProduct => storedProduct.productId === data.productId,
    );

    if (!storedProducts.length) {
      throw new AppErrors('Product not exists', 400);
    }

    try {
      const storedProductsToDelete: IDeleteStorageProducts[] = [];
      for (let index = 0; index < data.quantity; index++) {
        storedProductsToDelete.push({ id: storedProducts[index].id });
      }

      console.log(JSON.stringify(storedProductsToDelete));

      await this.storagesRepository.rmvProducts(storedProductsToDelete);
    } catch (error: any) {
      throw new AppErrors('Error on associate products', 500);
    }
*/
  }
}
