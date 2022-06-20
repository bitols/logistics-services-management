import { IUpdateStoragesLocationRequest } from '@shared-types/storages/domain/models/requests/IUpdateStoragesLocationRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { IUpdateLocationUseCase } from '../domain/useCases/IUpdateLocationUseCase';

@injectable()
export class UpdateLocationUseCase implements IUpdateLocationUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(
    data: IUpdateStoragesLocationRequest,
  ): Promise<IStoragesResponse> {
    const storage = await this.storagesRepository.getById(data.id);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    storage.location = data.location;

    await this.storagesRepository.save(storage);
    return storage as IStoragesResponse;
  }
}
