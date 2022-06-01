import { ISuppliersResponse } from '@shared-types/suppliers/domain/models/responses/ISuppliersResponse';
import { IGetSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/IGetSuppliersRequest';

export interface ISuppliersGateway {
  getAll(): Promise<ISuppliersResponse[]>;
  getById(request: IGetSuppliersRequest): Promise<ISuppliersResponse>;
}
