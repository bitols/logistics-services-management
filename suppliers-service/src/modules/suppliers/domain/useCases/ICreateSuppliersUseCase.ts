import { ICreateSuppliersRequest } from '../models/requests/ICreateSuppliersRequest';
import { ISuppliersResponse } from '../models/responses/ISuppliersResponse';

export interface ICreateSuppliersUseCase {
  execute(data: ICreateSuppliersRequest): Promise<ISuppliersResponse>;
}
