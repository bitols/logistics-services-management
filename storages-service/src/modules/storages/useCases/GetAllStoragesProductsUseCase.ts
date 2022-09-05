import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStorages } from '../domain/models/requests/IGetStorages';
import { IStorageProducts } from '../domain/models/responses/IStorageProducts';
import { IStorageProductsRepository } from '../domain/repositories/IStoragePorductsRepository';

@injectable()
export default class GetAllStoragesProductsUseCase {
  constructor(
    @inject('StorageProductsRepository')
    private storageProductsRepository: IStorageProductsRepository,
  ) {}

  public async execute(data: IGetStorages): Promise<IStorageProducts[]> {
    const storageProducts =
      await this.storageProductsRepository.getAllByStorages(data.id);

    if (!storageProducts.length) {
      throw new AppErrors('Products not found');
    }

    return storageProducts.map(product => {
      return {
        id: product.id,
        name: product.name,
        value: product.value,
        height: product.height,
        lenght: product.lenght,
        width: product.width,
        productId: product.productId,
        storageId: product.storageId,
      };
    });
  }
}
