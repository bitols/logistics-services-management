import { IUpdateProductsRequest } from '../models/requests/IUpdateProductsRequest';
import { IProductsResponse } from '../models/responses/IProductsResponse';

export interface IUpdateProducstUseCase {
  execute(data: IUpdateProductsRequest): Promise<IProductsResponse>;
}
