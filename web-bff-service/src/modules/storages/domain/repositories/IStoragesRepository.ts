import { IGetStorages } from '../models/requests/IGetStorages';
import { IGetStoragesBySender } from '../models/requests/IGetStoragesBySender';
import { IGetStoragesBySupplier } from '../models/requests/IGetStoragesBySupplier';
import { IStorages } from '../models/responses/IStorages';

export interface IStoragesRepository {
  getAllBySupplier(
    request: IGetStoragesBySupplier,
  ): Promise<IStorages[] | undefined>;
  getById(request: IGetStorages): Promise<IStorages | undefined>;
  getAllBySender(
    request: IGetStoragesBySender,
  ): Promise<IStorages[] | undefined>;
}
