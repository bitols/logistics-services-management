import { ISuppliersResponse } from '@shared-types/suppliers/domain/models/responses/ISuppliersResponse';

export interface IGetAllSuppliersUseCase {
  execute(): Promise<ISuppliersResponse[]>;
}
