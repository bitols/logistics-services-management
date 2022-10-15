import { IGetAllProductsBySender } from '../models/requests/IGetAllProductsBySender';
import { IProducts } from '../models/responses/IProducts';
export interface IProductsRepository {
  getAllBySender(
    request: IGetAllProductsBySender,
  ): Promise<IProducts[] | undefined>;
}
