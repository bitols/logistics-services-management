export interface IRegisterStoragesCapacityRequest {
  storageId: string;
  capacity: number;
  stored: number;
  usage: number;
  products: number;
  value: number;
  senderId: string;
}
