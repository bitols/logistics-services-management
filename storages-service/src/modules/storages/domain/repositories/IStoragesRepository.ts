import { IStorage } from '../models/entities/IStorage';
import { ICreateStoragesRequest } from '../models/requests/ICreateStoragesRequest';

export interface IStoragesRepository {
  create(data: ICreateStoragesRequest): Promise<IStorage>;
  save(storage: IStorage): Promise<IStorage>;
  remove(storage: IStorage): Promise<void>;
  getById(id: string): Promise<IStorage | undefined>;
  getAllBySupplier(supplier: string): Promise<IStorage[]>;
}
