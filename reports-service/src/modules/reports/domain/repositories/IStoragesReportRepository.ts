import { IStorageReport } from '../models/entities/IStorageReport';
import { IRegisterStoragesReport } from '../models/requests/IRegisterStoragesReport';

export interface IStoragesReportRepository {
  create(data: IRegisterStoragesReport): Promise<IStorageReport>;
  save(storageCapacity: IStorageReport): Promise<IStorageReport>;
  getByStorageId(storage: string): Promise<IStorageReport | null | undefined>;
  getAllBySender(sender: string): Promise<IStorageReport[]>;
}
