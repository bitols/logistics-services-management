import { IGetSuppliersRequest } from '../models/requests/IGetSuppliersRequest';
import { ISuppliersResponse } from '../models/responses/ISuppliersResponse';

export interface IGetSuppliersUseCase {
  execute(data: IGetSuppliersRequest): Promise<ISuppliersResponse>;
}
