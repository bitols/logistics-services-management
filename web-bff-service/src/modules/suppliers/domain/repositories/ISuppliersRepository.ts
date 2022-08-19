import { ISuppliersResponse } from '@shared-types/suppliers/domain/models/responses/ISuppliersResponse';
import { IGetSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/IGetSuppliersRequest';

export interface ISuppliersRepository {
  getAll(): Promise<ISuppliersResponse[] | undefined>;
  getById(
    request: IGetSuppliersRequest,
  ): Promise<ISuppliersResponse | undefined>;
}
