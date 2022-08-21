import { IGetSenders } from '../models/requests/IGetSenders';
import { ISenders } from '../models/responses/ISenders';

export interface ISendersRepository {
  getAll(): Promise<ISenders[] | undefined>;
  getById(request: IGetSenders): Promise<ISenders | undefined>;
}
