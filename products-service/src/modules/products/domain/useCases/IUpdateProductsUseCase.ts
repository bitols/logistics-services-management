import { IUpdateProductsRequest } from '@shared-types/products/domain/models/requests/IUpdateProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';

export interface IUpdateProducstUseCase {
  execute(data: IUpdateProductsRequest): Promise<IProductsResponse>;
}
