import { ICreateProductsRequest } from '../models/requests/ICreateProductsRequest';
import { IProduct } from '../models/entities/IProduct';

export interface IProductsRepository {
  create(data: ICreateProductsRequest): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  getById(id: string): Promise<IProduct | undefined>;
  getAllByClient(client: string): Promise<IProduct[]>;
  getAllByStorage(storage: string): Promise<IProduct[]>;
}
