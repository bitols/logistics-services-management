import { IGetProductsRequest } from '@shared-types/products/domain/models/requests/IGetProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';

export interface IGetProductsUseCase {
  execute(data: IGetProductsRequest): Promise<IProductsResponse>;
}
