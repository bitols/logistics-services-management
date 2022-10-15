import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IRmvStorageProduct } from '../domain/models/requests/IRmvStorageProductl';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class RmvStoragesproductsUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IRmvStorageProduct): Promise<void> {
    const storedProducts = await this.storagesRepository.getProducts({
      id: data.storageId,
    });

    if (!storedProducts) {
      throw new AppErrors('Storage is empty', 400);
    }

    const storedProductsToDelete = storedProducts.filter(
      storedProduct => storedProduct.productId === data.productId,
    );

    if (!storedProductsToDelete.length) {
      throw new AppErrors('Product not exists', 400);
    }

    try {
      const promises = [];
      for (let index = 0; index < data.quantity; index++) {
        promises.push(
          this.storagesRepository.rmvProducts({
            id: storedProductsToDelete[index].id,
          }),
        );
      }
      Promise.all(promises)
        .then(response => console.log(response))
        .catch(error => console.log(error));
    } catch (error: any) {
      throw new AppErrors('Error on associate products', 500);
    }
  }
}
