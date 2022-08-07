import { IGetAllProductsByStorageId } from '../models/requests/IGetAllProductsByStorageId';
import { IProducts } from '../models/responses/IProducts';
export interface IProductsRepository {
  getAllByStorage(
    request: IGetAllProductsByStorageId,
  ): Promise<IProducts[] | undefined>;
}
