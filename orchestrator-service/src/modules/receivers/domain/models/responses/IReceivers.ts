export interface IReceivers {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
}
