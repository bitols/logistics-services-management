import { IGetSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/IGetSuppliersRequest';
import { ISuppliersResponse } from '@shared-types/suppliers/domain/models/responses/ISuppliersResponse';

export interface IGetSuppliersUseCase {
  execute(data: IGetSuppliersRequest): Promise<ISuppliersResponse>;
}
