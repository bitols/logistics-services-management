import { IUpdateSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/IUpdateSuppliersRequest';
import { ISuppliersResponse } from '@shared-types/suppliers/domain/models/responses/ISuppliersResponse';

export interface IUpdateSuppliersUseCase {
  execute(data: IUpdateSuppliersRequest): Promise<ISuppliersResponse>;
}
