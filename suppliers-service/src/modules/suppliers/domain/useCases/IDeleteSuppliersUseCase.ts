import { IDeleteSuppliersRequest } from '../models/requests/IDeleteSuppliersRequests';

export interface IDeleteSuppliersUseCase {
  execute(data: IDeleteSuppliersRequest): Promise<void>;
}
