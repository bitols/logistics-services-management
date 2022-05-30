import { IGetAllProductsBySenderIdRequest } from '@shared-types/products/domain/models/requests/IGetAllProductsBySenderIdRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';

export interface IGetAllProductsBySenderIdUseCase {
  execute(data: IGetAllProductsBySenderIdRequest): Promise<IProductsResponse[]>;
}
