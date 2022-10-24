export interface IStoragesReport {
  id: string;
  storageId: string;
  capacity: number;
  stored: number;
  usage: number;
  products: IProductsStorageReport[];
  value: number;
  items: number;
  senderId: string;
}

export interface IProductsStorageReport {
  id: string;
  name: string;
  stored: number;
  usage: number;
  value: number;
  items: number;
}
