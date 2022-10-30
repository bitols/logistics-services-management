import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetAllStoragesBySenderId } from '../domain/models/requests/IGetAllStoragesBySenderId';
import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class GetAllStoragesBySenderIdUsecase {
  private scope = '[GetAllStoragesBySenderIdUsecase]';
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IGetAllStoragesBySenderId): Promise<IStorages[]> {
    const method = '[execute]';

    console.time(
      `[INFO]${this.scope}${method} Request all ${JSON.stringify(
        data,
      )} from data base`,
    );
    const storages = await this.storagesRepository.getAllBySender(
      data.senderId,
    );

    if (!storages.length) {
      console.timeEnd(
        `[INFO]${this.scope}${method} Request all ${JSON.stringify(
          data,
        )} from data base`,
      );
      throw new AppErrors('Storages not found');
    }

    console.timeEnd(
      `[INFO]${this.scope}${method} Request all ${JSON.stringify(
        data,
      )} from data base`,
    );

    return storages.map(storage => {
      return {
        id: storage.id,
        name: storage.name,
        email: storage.email,
        address: storage.address,
        capacity: storage.capacity,
        phone: storage.phone,
        supplierId: storage.supplierId,
        senderId: storage.senderId,
        location: storage.location,
      };
    });
  }
}
