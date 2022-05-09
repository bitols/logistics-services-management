import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteStoragesRequest } from '../domain/models/requests/IDeleteStoragesRequest';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { IDeleteStoragesUseCase } from '../domain/useCases/IDeleteStoragesUseCase';

@injectable()
export default class DeleteStoragesUseCase implements IDeleteStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IDeleteStoragesRequest): Promise<void> {
    const storage = await this.storagesRepository.getById(data.id);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    await this.storagesRepository.remove(storage);
  }
}
