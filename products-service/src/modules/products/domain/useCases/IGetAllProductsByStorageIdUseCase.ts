import { IGetAllProductsByStorageIdRequest } from '../models/requests/IGetAllProductsByStoragedRequest';
import { IProductsResponse } from '../models/responses/IProductsResponse';

export interface IGetAllProductsByStorageIdUseCase {
  execute(
    data: IGetAllProductsByStorageIdRequest,
  ): Promise<IProductsResponse[]>;
}
