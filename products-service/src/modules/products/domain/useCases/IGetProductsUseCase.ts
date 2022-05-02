import { IGetProductsRequest } from '../models/requests/IGetProductsRequest';
import { IProductsResponse } from '../models/responses/IProductsResponse';

export interface IGetProductsUseCase {
  execute(data: IGetProductsRequest): Promise<IProductsResponse>;
}
