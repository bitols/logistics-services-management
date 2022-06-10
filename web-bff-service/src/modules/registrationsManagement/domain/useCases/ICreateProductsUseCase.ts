import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';

export interface ICreateProductUseCase {
  execute(data: ICreateProductsRequest): Promise<any>;
}
