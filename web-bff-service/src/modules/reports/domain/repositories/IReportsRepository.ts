import { IGetStoragesReport } from '../models/requests/IGetStoragesReport';
import { IStoragesReport } from '../models/responses/IStoragesReport';

export interface IReportsRepository {
  getStoragesReport(
    request: IGetStoragesReport,
  ): Promise<IStoragesReport | undefined>;
}
