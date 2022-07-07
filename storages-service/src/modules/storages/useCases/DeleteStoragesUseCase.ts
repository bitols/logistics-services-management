import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteStorages } from '../domain/models/requests/IDeleteStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
@injectable()
export default class DeleteStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IDeleteStorages): Promise<void> {
    const storage = await this.storagesRepository.getById(data.id);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    await this.storagesRepository.remove(storage);
  }
}
