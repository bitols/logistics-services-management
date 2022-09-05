import { dataSource } from '@config/orm';
import { IStorageProduct } from '@modules/storages/domain/models/entities/IStorageProduct';
import { ICreateStorageProducts } from '@modules/storages/domain/models/requests/ICreateStorageProducts';
import { IStorageProductsRepository } from '@modules/storages/domain/repositories/IStoragePorductsRepository';
import StorageProduct from '../entities/StorageProduct';

export class StorageProductsRepository implements IStorageProductsRepository {
  private ormRepository;

  constructor() {
    this.ormRepository = dataSource.getRepository(StorageProduct);
  }

  async getById(id: string): Promise<IStorageProduct | null | undefined> {
    console.log(`get product by id: ${id}`);

    const storageProduct = await this.ormRepository.findOneById(id);

    return storageProduct;
  }

  public async getAllByStorages(storage: string): Promise<IStorageProduct[]> {
    console.log(`get all products by storage id: ${storage}`);

    const storageProduct = await this.ormRepository.findBy({
      storageId: storage,
    });

    return storageProduct;
  }

  public async create(data: ICreateStorageProducts): Promise<IStorageProduct> {
    console.log(`create storage product: ${JSON.stringify(data)}`);

    const storageProduct = this.ormRepository.create(data);

    return storageProduct;
  }

  public async save(storageProduct: IStorageProduct): Promise<IStorageProduct> {
    console.log(`save storage product: ${JSON.stringify(storageProduct)}`);

    await this.ormRepository.save(storageProduct);

    return storageProduct;
  }

  public async remove(storageProduct: IStorageProduct): Promise<void> {
    console.log(`remove storage product: ${JSON.stringify(storageProduct)}`);

    await this.ormRepository.remove(storageProduct);
  }
}
