import { IProduct } from '../models/entities/IProduct';
import { ICreateProducts } from '../models/requests/ICreateProducts';

export interface IProductsRepository {
  create(data: ICreateProducts): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  remove(product: IProduct): Promise<void>;
  getById(id: string): Promise<IProduct | null | undefined>;
  getByName(sender: string, name: string): Promise<IProduct | null | undefined>;
  getAllBySender(sender: string): Promise<IProduct[]>;
}
