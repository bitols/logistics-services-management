import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { IGetStoragesUseCase } from '../domain/useCases/IGetStoragesUseCase';

@injectable()
export default class GetStoragesUseCase implements IGetStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IGetStoragesRequest): Promise<IStoragesResponse> {
    const storage = await this.storagesRepository.getById(data.id);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    return storage as IStoragesResponse;
  }
}
