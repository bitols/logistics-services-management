import { IGetReceivers } from '../models/requests/IGetReceivers';
import { IReceivers } from '../models/responses/IReceivers';

export interface IReceiversRepository {
  getById(request: IGetReceivers): Promise<IReceivers | undefined>;
  getAll(): Promise<IReceivers[] | undefined>;
}
