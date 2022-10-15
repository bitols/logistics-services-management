import { IProductStorageReport } from './IProductStorageReport';

export interface IStorageReport {
  id: any;
  storageId: string;
  capacity: number;
  stored: number;
  usage: number;
  products: IProductStorageReport[];
  value: number;
  items: number;
  senderId: string;
}
