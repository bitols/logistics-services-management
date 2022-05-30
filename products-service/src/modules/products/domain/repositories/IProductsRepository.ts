import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import { IProduct } from '@shared-types/products/domain/models/entities/IProduct';

export interface IProductsRepository {
  create(data: ICreateProductsRequest): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  getById(id: string): Promise<IProduct | undefined>;
  getAllBySender(sender: string): Promise<IProduct[]>;
  getAllByStorage(storage: string): Promise<IProduct[]>;
}
