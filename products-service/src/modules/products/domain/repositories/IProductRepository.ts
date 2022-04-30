import { ICreateProductRequest } from '../models/requests/ICreateProductRequest';
import { IProduct } from '../models/entities/IProduct';

export interface IProductRepository {
  create(data: ICreateProductRequest): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  getById(id: string): Promise<IProduct | undefined>;
  getAllByClient(client: string): Promise<IProduct[]>;
  getAllByDepot(depot: string): Promise<IProduct[]>;
}
