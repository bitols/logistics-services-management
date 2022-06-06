import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import { IGetProductsRequest } from '@shared-types/products/domain/models/requests/IGetProductsRequest';
import { IGetAllProductsBySenderIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsBySenderIdRequest';
import { IGetAllProductsByStorageIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsByStoragedRequest';
import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
export interface IProductsGateway {
  getById(request: IGetProductsRequest): Promise<IProductsResponse | undefined>;
  getAllBySender(
    request: IGetAllProductsBySenderIdRequest,
  ): Promise<IProductsResponse[] | undefined>;
  getAllByStorage(
    request: IGetAllProductsByStorageIdRequest,
  ): Promise<IProductsResponse[] | undefined>;
  create(data: ICreateProductsRequest): Promise<IProductsResponse | undefined>;
}
