import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGeolocationsRepository } from '../domain/repositories/IGeolocationsRepository';
import { ILocations } from '../domain/models/responses/ILocations';
@injectable()
export class GetLocationFromAddressUseCase {
  constructor(
    @inject('GeolocationsRepository')
    private geolocationsRepository: IGeolocationsRepository,
  ) {}

  public async execute(address: string): Promise<ILocations> {
    const response = await this.geolocationsRepository.getGeometryFromAddress(
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
