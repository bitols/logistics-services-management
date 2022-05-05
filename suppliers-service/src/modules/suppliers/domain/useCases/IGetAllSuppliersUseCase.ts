import { ISuppliersResponse } from '../models/responses/ISuppliersResponse';

export interface IGetAllSuppliersUseCase {
  execute(): Promise<ISuppliersResponse[]>;
}
