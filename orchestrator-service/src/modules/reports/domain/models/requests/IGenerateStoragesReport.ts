export interface IGenerateStoragesReport {
  storageId: string;
  senderId: string;
  capacity: number;
  products: {
    productId: string;
    name: string;
    width: number;
    height: number;
    lenght: number;
    value: number;
  }[];
}
