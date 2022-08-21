import { IGetSuppliers } from '../models/requests/IGetSuppliers';
import { ISuppliers } from '../models/responses/ISuppliers';

export interface ISuppliersRepository {
  getAll(): Promise<ISuppliers[] | undefined>;
  getById(request: IGetSuppliers): Promise<ISuppliers | undefined>;
}
