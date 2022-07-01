import { ISupplier } from '../models/entities/ISupplier';
import { ICreateSuppliers } from '../models/requests/ICreateSuppliers';

export interface ISuppliersRepository {
  create(data: ICreateSuppliers): Promise<ISupplier>;
  save(supplier: ISupplier): Promise<ISupplier>;
  remove(supplier: ISupplier): Promise<void>;
  getById(id: string): Promise<ISupplier | null | undefined>;
  getAll(): Promise<ISupplier[]>;
}
