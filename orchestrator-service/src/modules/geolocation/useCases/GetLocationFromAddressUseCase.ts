import { inject, injectable } from 'tsyringe';
import { IGeolocationsGateway } from '../domain/gateways/IGeolocationsGateway';
import { ILocations } from '../domain/models/responses/ILocations';
@injectable()
export class GetLocationFromAddressUseCase {
  constructor(
    @inject('GeolocationsGateway')
    private geolocationsGateway: IGeolocationsGateway,
  ) {}

  public async execute(address: string): Promise<ILocations> {
    const response = await this.geolocationsGateway.getLocationFromAddress(
      address,
    );

    return {
      lat: response.results[0].geometry.location.lat,
      lng: response.results[0].geometry.location.lng,
    };
  }
}
