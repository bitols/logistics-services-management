import { ISupplier } from '../models/entities/ISupplier';
import { ICreateSuppliersRequest } from '../models/requests/ICreateSuppliersRequest';

export interface ISuppliersRepository {
  create(data: ICreateSuppliersRequest): Promise<ISupplier>;
  save(supplier: ISupplier): Promise<ISupplier>;
  remove(supplier: ISupplier): Promise<void>;
  getById(id: string): Promise<ISupplier | undefined>;
  getAll(): Promise<ISupplier[]>;
}
