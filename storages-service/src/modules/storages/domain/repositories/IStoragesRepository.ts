import { IStorage } from '@shared-types/storages/domain/models/entities/IStorage';
import { ICreateStoragesRequest } from '@shared-types/storages/domain/models/requests/ICreateStoragesRequest';

export interface IStoragesRepository {
  create(data: ICreateStoragesRequest): Promise<IStorage>;
  save(storage: IStorage): Promise<IStorage>;
  remove(storage: IStorage): Promise<void>;
  getById(id: string): Promise<IStorage | null | undefined>;
  getAllBySupplier(supplier: string): Promise<IStorage[]>;
  getAllBySender(sender: string): Promise<IStorage[]>;
}
