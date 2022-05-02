import { IGetAllProductsByClientIdRequest } from '../models/requests/IGetAllProductsByClientIdRequest';
import { IProductsResponse } from '../models/responses/IProductsResponse';

export interface IGetAllProductsByClientIdUseCase {
  execute(data: IGetAllProductsByClientIdRequest): Promise<IProductsResponse[]>;
}
