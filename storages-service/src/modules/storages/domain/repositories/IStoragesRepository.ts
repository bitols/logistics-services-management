import { IStorage } from '../models/entities/IStorage';
import { ICreateStorages } from '../models/requests/ICreateStorages';

export interface IStoragesRepository {
  create(data: ICreateStorages): Promise<IStorage>;
  save(storage: IStorage): Promise<IStorage>;
  remove(storage: IStorage): Promise<void>;
  getById(id: string): Promise<IStorage | null | undefined>;
  getByName(sender: string, name: string): Promise<IStorage | null | undefined>;
  getAllBySupplier(supplier: string): Promise<IStorage[]>;
  getAllBySender(sender: string): Promise<IStorage[]>;
  getAllByName(sender: string, name: string): Promise<IStorage[]>;
}
