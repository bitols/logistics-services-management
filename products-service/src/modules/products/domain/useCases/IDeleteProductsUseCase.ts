import { IDeleteProductsRequest } from '@shared-types/products/domain/models/requests/IDeleteProductsRequest';
export interface IDeleteProductsUseCase {
  execute(data: IDeleteProductsRequest): Promise<void>;
}
