import { ISupplier } from '@shared-types/suppliers/domain/models/entities/ISupplier';
import { ICreateSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/ICreateSuppliersRequest';

export interface ISuppliersRepository {
  create(data: ICreateSuppliersRequest): Promise<ISupplier>;
  save(supplier: ISupplier): Promise<ISupplier>;
  remove(supplier: ISupplier): Promise<void>;
  getById(id: string): Promise<ISupplier | null | undefined>;
  getAll(): Promise<ISupplier[]>;
}
