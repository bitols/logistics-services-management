export interface IUpdateStoragesLocationRequest {
  id: string;
  location: {
    lat: number;
    lng: number;
  };
}
