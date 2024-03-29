import { ICreateStorageProducts } from '../models/requests/ICreateStorageProducts';
import { ICreateStorages } from '../models/requests/ICreateStorages';
import { IDeleteStorageProducts } from '../models/requests/IDeleteStorageProducts';
import { IDeleteStorages } from '../models/requests/IDeleteStorages';
import { IGetStorages } from '../models/requests/IGetStorages';
import { IGetStoragesBySender } from '../models/requests/IGetStoragesBySender';
import { IGetStoragesBySupplier } from '../models/requests/IGetStoragesBySupplier';
import { IStorageProducts } from '../models/responses/IStorageProducts';
import { IStorages } from '../models/responses/IStorages';

export interface IStoragesRepository {
  getAllBySupplier(
    request: IGetStoragesBySupplier,
  ): Promise<IStorages[] | undefined>;
  getById(request: IGetStorages): Promise<IStorages | undefined>;
  getAllBySender(
    request: IGetStoragesBySender,
  ): Promise<IStorages[] | undefined>;
  getAllByName(request: IGetStoragesBySender): Promise<IStorages[] | undefined>;
  create(request: ICreateStorages): Promise<IStorages | undefined>;
  delete(request: IDeleteStorages): Promise<void>;
  getProducts(request: IGetStorages): Promise<IStorageProducts[] | undefined>;
  addProducts(
    request: ICreateStorageProducts,
  ): Promise<IStorageProducts | undefined>;
  rmvProducts(request: IDeleteStorageProducts): Promise<void>;
}
