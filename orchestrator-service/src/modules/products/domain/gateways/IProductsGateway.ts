import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import { IGetAllProductsByStorageIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsByStoragedRequest';

export interface IProductsGateway {
  getAllByStorage(
    request: IGetAllProductsByStorageIdRequest,
  ): Promise<IProductsResponse[] | undefined>;
}
