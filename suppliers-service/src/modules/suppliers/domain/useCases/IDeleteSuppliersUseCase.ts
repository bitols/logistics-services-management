import { IDeleteSuppliersRequest } from '@shared-types/suppliers/domain/models/IDeleteSuppliersRequests';

export interface IDeleteSuppliersUseCase {
  execute(data: IDeleteSuppliersRequest): Promise<void>;
}
