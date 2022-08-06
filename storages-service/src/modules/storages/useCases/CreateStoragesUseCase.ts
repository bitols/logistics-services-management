import { inject, injectable } from 'tsyringe';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { ICreateStorages } from '../domain/models/requests/ICreateStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import { queueProducer } from '@config/queue';
import queueConfig from '@config/queue/config';
@injectable()
export default class CreateStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: ICreateStorages): Promise<IStorages> {
    const storage = await this.storagesRepository.create(data);

    await this.storagesRepository.save(storage);

    await queueProducer(
      queueConfig.storageLocationTopic,
      JSON.stringify({
        id: storage.id,
        address: storage.address,
      }),
    );

    await queueProducer(
      queueConfig.storageCapacityTopic,
      JSON.stringify({ id: storage.id }),
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
