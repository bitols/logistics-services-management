import { IGetStorages } from '../models/requests/IGetStorages';
import { IUpdateStoragesLocation } from '../models/requests/IUpdateStoragesLocation';
import { IStorageProducts } from '../models/responses/IStorageProducts';
import { IStorages } from '../models/responses/IStorages';
export interface IStoragesRepository {
  getById(request: IGetStorages): Promise<IStorages | undefined>;
  updateLocation(
    request: IUpdateStoragesLocation,
  ): Promise<IStorages | undefined>;
  getProducts(request: IGetStorages): Promise<IStorageProducts[] | undefined>;
}
