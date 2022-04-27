import { ICreateProductRequest } from '../models/requests/ICreateProductRequest';
import { IProduct } from '../models/entities/IProduct';

export interface IProductsRepository {
  create(data: ICreateProductRequest): Promise<IProduct>;
  update(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  getById(id: string): Promise<IProduct | undefined>;
  getAllByClient(id: string): Promise<IProduct[]>;
  getAllByDepot(id: string): Promise<IProduct[]>;
}
