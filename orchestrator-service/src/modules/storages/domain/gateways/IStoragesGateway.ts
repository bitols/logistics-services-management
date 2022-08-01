import { IGetStorages } from '../models/requests/IGetStorages';
import { IUpdateStoragesLocation } from '../models/requests/IUpdateStoragesLocation';
import { IStorages } from '../models/responses/IStorages';
export interface IStoragesGateway {
  getById(request: IGetStorages): Promise<IStorages | undefined>;
  updateLocation(
    request: IUpdateStoragesLocation,
  ): Promise<IStorages | undefined>;
}
