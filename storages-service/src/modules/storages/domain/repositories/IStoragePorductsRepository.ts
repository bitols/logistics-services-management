import { IStorageProduct } from '../models/entities/IStorageProduct';
import { ICreateStorageProducts } from '../models/requests/ICreateStorageProducts';

export interface IStorageProductsRepository {
  getAllByStorages(storage: string): Promise<IStorageProduct[]>;
  getById(id: string): Promise<IStorageProduct | null | undefined>;
  create(data: ICreateStorageProducts): Promise<IStorageProduct>;
  save(storageProduct: IStorageProduct): Promise<IStorageProduct>;
  remove(storageProduct: IStorageProduct): Promise<void>;
}
