import { ICreateProductsRequest } from '../models/requests/ICreateProductsRequest';
import { IProductsResponse } from '../models/responses/IProductsResponse';

export interface ICreateProductUseCase {
  execute(data: ICreateProductsRequest): Promise<IProductsResponse>;
}
