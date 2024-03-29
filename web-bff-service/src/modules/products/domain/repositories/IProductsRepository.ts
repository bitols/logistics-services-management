import { ICreateProducts } from '../models/requests/ICreateProducts';
import { IGetProductsBySender } from '../models/requests/IGetProductsBySender';
import { IGetProducts } from '../models/requests/IGetProducts';
import { IProducts } from '../models/responses/IProducts';
import { IDeleteProducts } from '../models/requests/IDeleteProducts';

export interface IProductsRepository {
  getById(request: IGetProducts): Promise<IProducts | undefined>;
  getAllBySender(
    request: IGetProductsBySender,
  ): Promise<IProducts[] | undefined>;
  create(data: ICreateProducts): Promise<IProducts | undefined>;
  delete(request: IDeleteProducts): Promise<void>;
  getAllByName(request: IGetProductsBySender): Promise<IProducts[] | undefined>;
}
