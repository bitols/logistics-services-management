import { IGetAllProductsBySenderIdRequest } from '../models/requests/IGetAllProductsBySenderIdRequest';
import { IProductsResponse } from '../models/responses/IProductsResponse';

export interface IGetAllProductsBySenderIdUseCase {
  execute(data: IGetAllProductsBySenderIdRequest): Promise<IProductsResponse[]>;
}
