import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStorages } from '../domain/models/requests/IGetStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesGateway } from '../domain/gateways/IStoragesGateway';

@injectable()
export default class GetStoragesUseCase {
  constructor(
    @inject('StoragesGateway')
    private storagesGateway: IStoragesGateway,
  ) {}

  public async execute(request: IGetStorages): Promise<IStorages> {
    const storage = await this.storagesGateway.getById(request);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    return storage;
  }
}
