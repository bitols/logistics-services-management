import { ICreateProducts } from '../models/requests/ICreateProducts';
import { IGetProductsBySender } from '../models/requests/IGetProductsBySender';
import { IGetProductsByStorage } from '../models/requests/IGetProductsByStorage';
import { IGetProducts } from '../models/requests/IGetProducts';
import { IProducts } from '../models/responses/IProducts';

export interface IProductsRepository {
  getById(request: IGetProducts): Promise<IProducts | undefined>;
  getAllBySender(
    request: IGetProductsBySender,
  ): Promise<IProducts[] | undefined>;
  getAllByStorage(
    request: IGetProductsByStorage,
  ): Promise<IProducts[] | undefined>;
  create(data: ICreateProducts): Promise<IProducts | undefined>;
}
