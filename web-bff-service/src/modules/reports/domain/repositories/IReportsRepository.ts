import { IGetStoragesCapacityBySender } from '../models/requests/IGetStoragesCapacityBySender';
import { IStoragesCapacity } from '../models/responses/IStoragesCapacity';

export interface IReportsRepository {
  getAllStoragesCapacityBySender(
    request: IGetStoragesCapacityBySender,
  ): Promise<IStoragesCapacity[] | undefined>;
}
