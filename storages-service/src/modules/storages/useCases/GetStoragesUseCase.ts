import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStorages } from '../domain/models/requests/IGetStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class GetStoragesUseCase {
  private scope = '[GetStoragesUseCase]';
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IGetStorages): Promise<IStorages> {
    const method = '[execute]';

    console.time(
      `[INFO]${this.scope}${method} Request ${JSON.stringify(
        data,
      )} from data base`,
    );
    const storage = await this.storagesRepository.getById(data.id);

    if (!storage) {
      console.timeEnd(
        `[INFO]${this.scope}${method} Request ${JSON.stringify(
          data,
        )} from data base`,
      );
      throw new AppErrors('Storage not found');
    }

    console.timeEnd(
      `[INFO]${this.scope}${method} Request ${JSON.stringify(
        data,
      )} from data base`,
    );

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
  }
}
