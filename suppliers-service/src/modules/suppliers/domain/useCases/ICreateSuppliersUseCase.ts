import { ICreateSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/ICreateSuppliersRequest';
import { ISuppliersResponse } from '@shared-types/suppliers/domain/models/responses/ISuppliersResponse';

export interface ICreateSuppliersUseCase {
  execute(data: ICreateSuppliersRequest): Promise<ISuppliersResponse>;
}
