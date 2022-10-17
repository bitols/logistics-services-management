export interface IStorageProducts {
  id: string;
  name: string;
  height: number;
  width: number;
  lenght: number;
  value: number;
  storageId: string;
  productId: string;
  quantity: number;
}
export interface IStoragesProductControl {
  increase: boolean;
  storedProduct: IStorageProducts;
}
