import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStoragesBySender } from '../domain/models/requests/IGetStoragesBySender';
import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class GetStoragesBySenderUsecase {
  private scope = '[GetStoragesBySenderUsecase]';
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IGetStoragesBySender): Promise<IStorages[]> {
    const method = '[execute]';

    console.time(
      `[INFO]${this.scope}${method} Request all ${JSON.stringify(
        data,
      )} from service`,
    );
    let storages: IStorages[] | undefined;

    if (!data.name) {
      storages = await this.storagesRepository.getAllBySender(data);
    } else {
      storages = await this.storagesRepository.getAllByName(data);
    }
    if (!storages) {
      console.timeEnd(
        `[INFO]${this.scope}${method} Request all ${JSON.stringify(
          data,
        )} from service`,
      );
      throw new AppErrors('Storages not found');
    }
    console.timeEnd(
      `[INFO]${this.scope}${method} Request all ${JSON.stringify(
        data,
      )} from service`,
    );
    return storages;
  }
}
