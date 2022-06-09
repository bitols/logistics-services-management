import { IStorageCapacity } from '@shared-types/reports/domain/models/entities/IStorageCapacity';
import { IRegisterStoragesCapacityRequest } from '@shared-types/reports/domain/models/requests/IRegisterStoragesCapacityRequest';

export interface IStoragesCapacityRepository {
  create(data: IRegisterStoragesCapacityRequest): Promise<IStorageCapacity>;
  save(storageCapacity: IStorageCapacity): Promise<IStorageCapacity>;
  getByStorageId(storage: string): Promise<IStorageCapacity | undefined>;
  getAllBySender(sender: string): Promise<IStorageCapacity[]>;
}
