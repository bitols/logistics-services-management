import { IGeolocationsGateway } from '@modules/geolocation/domain/gateways/IGeolocationsGateway';
import { inject, injectable } from 'tsyringe';
import { IUpdateStorageLocationUseCase } from '../domain/useCases/IUpdateStoragesLocationUseCase';
@injectable()
export class UpdateStoragesLocationUseCase
  implements IUpdateStorageLocationUseCase
{
  constructor(
    @inject('GeolocationsGateway')
    private geolocationsGateway: IGeolocationsGateway,
  ) {}

  public async execute(request: {
    id: string;
    address: string;
  }): Promise<void> {
    const location = await this.geolocationsGateway.getLocationFromAddress(
      request.address,
    );

    if (location) {
      console.log({ id: request.id, location: location });
    }
  }
}
