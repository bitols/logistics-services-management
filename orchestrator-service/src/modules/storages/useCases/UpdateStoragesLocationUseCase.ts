import { inject, injectable } from 'tsyringe';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { IUpdateStoragesLocation } from '../domain/models/requests/IUpdateStoragesLocation';

@injectable()
export class UpdateStoragesLocationUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesGateway: IStoragesRepository,
  ) {}

  public async execute(request: IUpdateStoragesLocation): Promise<void> {
    await this.storagesGateway.updateLocation(request);
  }
}
