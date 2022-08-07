import { IRegisterStoragesReport } from '../models/requests/IRegisterStoragesReport';
import { IStoragesReport } from '../models/responses/IStoragesReport';
export interface IReportsRepository {
  registerStoragesCapacity(
    request: IRegisterStoragesReport,
  ): Promise<IStoragesReport | undefined>;
}
