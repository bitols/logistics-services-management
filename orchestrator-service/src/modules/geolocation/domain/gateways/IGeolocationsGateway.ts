export interface IGeolocationsGateway {
  getLocationFromAddress(address: string): Promise<any | undefined>;
}
