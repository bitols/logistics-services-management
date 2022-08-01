import { inject, injectable } from 'tsyringe';
import { IStoragesGateway } from '../domain/gateways/IStoragesGateway';
import { IUpdateStoragesLocation } from '../domain/models/requests/IUpdateStoragesLocation';

@injectable()
export class UpdateStoragesLocationUseCase {
  constructor(
    @inject('StoragesGateway')
    private storagesGateway: IStoragesGateway,
  ) {}

  public async execute(request: IUpdateStoragesLocation): Promise<void> {
    await this.storagesGateway.updateLocation(request);
  }
}
