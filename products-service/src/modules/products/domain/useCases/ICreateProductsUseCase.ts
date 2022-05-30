import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';

export interface ICreateProductUseCase {
  execute(data: ICreateProductsRequest): Promise<IProductsResponse>;
}
