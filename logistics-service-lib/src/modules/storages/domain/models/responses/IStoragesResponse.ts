export interface IStoragesResponse {
  id: string;
  name: string;
  capacity: number;
  email: string;
  phone: string;
  address: string;
  supplierId: string;
  senderId: string;
  location?: {
    lat: number;
    lng: number;
  };
}
