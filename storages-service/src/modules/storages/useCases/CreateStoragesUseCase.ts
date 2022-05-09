import { inject, injectable } from 'tsyringe';
import { ICreateStoragesRequest } from '../domain/models/requests/ICreateStoragesRequest';
import { IStoragesResponse } from '../domain/models/responses/IStoragesResponse';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { ICreateStoragesUseCase } from '../domain/useCases/ICreateStoragesUseCase';

@injectable()
export default class CreateStoragesUseCase implements ICreateStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(
    data: ICreateStoragesRequest,
  ): Promise<IStoragesResponse> {
    const storage = await this.storagesRepository.create(data);

    await this.storagesRepository.save(storage);

    return storage as IStoragesResponse;
  }
}
