import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateStoragesLocation } from '../domain/models/requests/IUpdateStoragesLocation';
import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
@injectable()
export class UpdateLocationUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IUpdateStoragesLocation): Promise<IStorages> {
    const storage = await this.storagesRepository.getById(data.id);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    storage.location = data.location;

    await this.storagesRepository.save(storage);
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
