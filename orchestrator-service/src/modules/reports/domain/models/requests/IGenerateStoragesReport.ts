export interface IGenerateStoragesReport {
  storageId: string;
  senderId: string;
  capacity: number;
  products: {
    productId: string;
    name: string;
    volume: number;
    value: number;
  }[];
}
