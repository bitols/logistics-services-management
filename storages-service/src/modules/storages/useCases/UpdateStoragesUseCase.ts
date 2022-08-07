import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { IUpdateStorages } from '../domain/models/requests/IUpdateStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';

@injectable()
export default class UpdateStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: IUpdateStorages): Promise<IStorages> {
    const storage = await this.storagesRepository.getById(data.id);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    const changedAddress = storage.address !== data.address;
    const changeCapacity = storage.capacity !== data.capacity;

    storage.name = data.name;
    storage.email = data.email;
    storage.phone = data.phone;
    storage.address = data.address;
    storage.capacity = data.capacity;

    await this.storagesRepository.save(storage);

    if (changedAddress) {
      await queue.produce(
        queueConfig.storageLocationTopic,
        JSON.stringify({
          id: storage.id,
          address: storage.address,
        }),
      );
    }

    if (changeCapacity) {
      await queue.produce(
        queueConfig.storageCapacityTopic,
        JSON.stringify({ id: storage.id }),
      );
    }

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
