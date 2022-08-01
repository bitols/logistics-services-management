export interface IGenerateStoragesReport {
  storageId: string;
  senderId: string;
  capacity: number;
  products: {
    width: number;
    height: number;
    lenght: number;
    price: number;
  }[];
}
