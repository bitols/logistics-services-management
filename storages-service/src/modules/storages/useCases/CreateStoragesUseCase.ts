import { inject, injectable } from 'tsyringe';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { ICreateStorages } from '../domain/models/requests/ICreateStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
import AppErrors from '@shared/errors/AppErrors';
@injectable()
export default class CreateStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: ICreateStorages): Promise<IStorages> {
    const storageExists = await this.storagesRepository.getByName(
      data.senderId,
      data.name,
    );

    if (storageExists) {
      throw new AppErrors('Storage already exists');
    }

    const storage = await this.storagesRepository.create(data);

    await this.storagesRepository.save(storage);
    await queue.produce(
      queueConfig.storageLocationTopic,
      JSON.stringify({
        id: storage.id,
        address: storage.address,
      }),
    );
    await queue.produce(
      queueConfig.storageCapacityTopic,
      JSON.stringify({
        storageId: storage.id,
        senderId: storage.senderId,
        capacity: storage.capacity,
      }),
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
    };
  }
}
