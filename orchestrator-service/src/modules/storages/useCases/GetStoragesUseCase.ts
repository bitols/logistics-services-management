import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStorages } from '../domain/models/requests/IGetStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class GetStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesGateway: IStoragesRepository,
  ) {}

  public async execute(request: IGetStorages): Promise<IStorages> {
    const storage = await this.storagesGateway.getById(request);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    return storage;
  }
}
