import { IStorageCapacity } from '../models/entities/IStorageCapacity';
import { IRegisterStoragesCapacity } from '../models/requests/IRegisterStoragesCapacity';

export interface IStoragesCapacityRepository {
  create(data: IRegisterStoragesCapacity): Promise<IStorageCapacity>;
  save(storageCapacity: IStorageCapacity): Promise<IStorageCapacity>;
  getByStorageId(storage: string): Promise<IStorageCapacity | null | undefined>;
  getAllBySender(sender: string): Promise<IStorageCapacity[]>;
}
