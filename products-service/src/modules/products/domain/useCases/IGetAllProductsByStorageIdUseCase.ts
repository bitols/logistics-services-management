import { IGetAllProductsByStorageIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsByStoragedRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';

export interface IGetAllProductsByStorageIdUseCase {
  execute(
    data: IGetAllProductsByStorageIdRequest,
  ): Promise<IProductsResponse[]>;
}
