import { ISuppliersResponse } from '../models/responses/ISuppliersResponse';

export interface IGetSuppliersUseCase {
  execute(): Promise<ISuppliersResponse[]>;
}
