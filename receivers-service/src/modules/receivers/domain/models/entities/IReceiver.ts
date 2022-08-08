export interface ILocation {
  lat: number;
  lng: number;
}
export interface IReceiver {
  id: any;
  name: string;
  email: string;
  phone: string;
  address: string;
  location?: ILocation;
}
