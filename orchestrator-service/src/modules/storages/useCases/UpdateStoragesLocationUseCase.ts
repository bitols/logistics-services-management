import { IGeolocationsGateway } from '@modules/geolocation/domain/gateways/IGeolocationsGateway';
import { IUpdateStoragesLocationRequest } from '@shared-types/storages/domain/models/requests/IUpdateStoragesLocationRequest';
import { inject, injectable } from 'tsyringe';
import { IStoragesGateway } from '../domain/gateways/IStoragesGateway';

@injectable()
export class UpdateStoragesLocationUseCase {
  constructor(
    @inject('StoragesGateway')
    private storagesGateway: IStoragesGateway,
  ) {}

  public async execute(request: IUpdateStoragesLocationRequest): Promise<void> {
    await this.storagesGateway.updateLocation(request);
  }
}
