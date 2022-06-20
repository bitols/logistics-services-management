import { IGeolocationsGateway } from '@modules/geolocation/domain/gateways/IGeolocationsGateway';
import { inject, injectable } from 'tsyringe';
import { IStoragesGateway } from '../domain/gateways/IStoragesGateway';
import { IUpdateStorageLocationUseCase } from '../domain/useCases/IUpdateStoragesLocationUseCase';
@injectable()
export class UpdateStoragesLocationUseCase
  implements IUpdateStorageLocationUseCase
{
  constructor(
    @inject('GeolocationsGateway')
    private geolocationsGateway: IGeolocationsGateway,
    @inject('StoragesGateway')
    private storagesGateway: IStoragesGateway,
  ) {}

  public async execute(request: {
    id: string;
    address: string;
  }): Promise<void> {
    const response = await this.geolocationsGateway.getLocationFromAddress(
      request.address,
    );

    await this.storagesGateway.updateLocation({
      id: request.id,
      location: response.results[0].geometry.location,
    });
  }
}
