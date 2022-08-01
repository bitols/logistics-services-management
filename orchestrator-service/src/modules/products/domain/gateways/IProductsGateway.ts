import { IGetAllProductsByStorageId } from '../models/requests/IGetAllProductsByStorageId';
import { IProducts } from '../models/responses/IProducts';
export interface IProductsGateway {
  getAllByStorage(
    request: IGetAllProductsByStorageId,
  ): Promise<IProducts[] | undefined>;
}
