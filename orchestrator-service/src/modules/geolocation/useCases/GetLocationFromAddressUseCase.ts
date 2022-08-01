import AppErrors from '@shared/errors/AppErrors';
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
    const response = await this.geolocationsGateway.getGeometryFromAddress(
      address,
    );
    if (!response) {
      throw new AppErrors('Location not found');
    }
    return {
      lat: response.location.lat,
      lng: response.location.lng,
    };
  }
}
