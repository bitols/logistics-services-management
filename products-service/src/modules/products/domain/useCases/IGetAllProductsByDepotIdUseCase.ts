import { IGetAllProductsByDepotIdRequest } from '../models/requests/IGetAllProductsByDepotIdRequest';
import { IProductsResponse } from '../models/responses/IProductsResponse';

export interface IGetAllProductsByDepotIdUseCase {
  execute(data: IGetAllProductsByDepotIdRequest): Promise<IProductsResponse[]>;
}
