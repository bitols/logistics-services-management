import { IDeleteProductRequest } from '../models/requests/IDeleteProductRequest';
export interface IDeleteProductUseCase {
  execute(data: IDeleteProductRequest): Promise<void>;
}
