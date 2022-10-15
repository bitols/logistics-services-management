import { IStorageProducts } from '@modules/storages/domain/models/responses/IStorageProducts';

export interface IStoragesProductControl {
  increase: boolean;
  storedProduct: IStorageProducts;
}
