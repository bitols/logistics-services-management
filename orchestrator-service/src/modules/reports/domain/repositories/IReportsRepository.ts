import { IStorageReport } from '../models/entities/IStorageReport';
import { IGetStoragesReport } from '../models/requests/IGetStoragesReport';

export interface IReportsRepository {
  getStoragesReport(
    request: IGetStoragesReport,
  ): Promise<IStorageReport | undefined>;
  registerStoragesReport(request: IStorageReport): Promise<void>;
}
