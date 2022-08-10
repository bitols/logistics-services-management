import { IUpdateReceiversLocation } from '../models/requests/IUpdateReceiversLocation';
import { IReceivers } from '../models/responses/IReceivers';

export interface IReceiversRepository {
  updateLocation(
    request: IUpdateReceiversLocation,
  ): Promise<IReceivers | undefined>;
}
