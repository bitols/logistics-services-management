import { IDeleteProductsRequest } from '../models/requests/IDeleteProductsRequest';
export interface IDeleteProductsUseCase {
  execute(data: IDeleteProductsRequest): Promise<void>;
}
