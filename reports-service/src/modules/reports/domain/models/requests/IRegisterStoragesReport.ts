export interface IRegisterStoragesReport {
  storageId: string;
  capacity: number;
  stored: number;
  usage: number;
  products: IRegisterProductsStorageReport[];
  value: number;
  items: number;
  senderId: string;
}

export interface IRegisterProductsStorageReport {
  id: string;
  name: string;
  stored: number;
  usage: number;
  value: number;
  items: number;
}
