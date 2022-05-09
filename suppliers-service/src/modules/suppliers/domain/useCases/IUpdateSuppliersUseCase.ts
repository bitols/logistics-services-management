import { IUpdateSuppliersRequest } from '../models/requests/IUpdateSuppliersRequest';
import { ISuppliersResponse } from '../models/responses/ISuppliersResponse';

export interface IUpdateSuppliersUseCase {
  execute(data: IUpdateSuppliersRequest): Promise<ISuppliersResponse>;
}
