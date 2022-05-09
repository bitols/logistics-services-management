import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateStoragesRequest } from '../domain/models/requests/IUpdateStoragesRequest';
import { IStoragesResponse } from '../domain/models/responses/IStoragesResponse';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { IUpdateStoragesUseCase } from '../domain/useCases/IUpdateStoragesUseCase';

@injectable()
export default class UpdateStoragesUseCase implements IUpdateStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(
    data: IUpdateStoragesRequest,
  ): Promise<IStoragesResponse> {
    const storage = await this.storagesRepository.getById(data.id);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    storage.name = data.name;
    storage.email = data.email;
    storage.phone = data.phone;
    storage.address = data.address;
    storage.supplierId = data.supplierId;

    await this.storagesRepository.save(storage);

    return storage as IStoragesResponse;
  }
}
