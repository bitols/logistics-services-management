export interface IReceivers {
  id: any;
  name: string;
  email: string;
  phone: string;
  address: string;
  location?: {
    lat: number;
    lng: number;
  };
}
