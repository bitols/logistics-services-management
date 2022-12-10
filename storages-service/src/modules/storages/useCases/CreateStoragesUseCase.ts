import { inject, injectable } from 'tsyringe';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { ICreateStorages } from '../domain/models/requests/ICreateStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import queue from '@config/queue';
import queueConfig from '@config/queue/config';
import AppErrors from '@shared/errors/AppErrors';
@injectable()
export default class CreateStoragesUseCase {
  private scope = '[CreateStoragesUseCase]';
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(data: ICreateStorages): Promise<IStorages> {
    const method = '[execute]';

    console.time(
      `[INFO]${this.scope}${method} Register ${JSON.stringify(
        data,
      )} to data base`,
    );
    const storageExists = await this.storagesRepository.getByName(
      data.senderId,
      data.name,
    );

    if (storageExists) {
      console.timeEnd(
        `[INFO]${this.scope}${method} Register ${JSON.stringify(
          data,
        )} to data base`,
      );
      throw new AppErrors('Storage already exists');
    }

    const storage = await this.storagesRepository.create(data);

    await this.storagesRepository.save(storage);
    console.timeEnd(
      `[INFO]${this.scope}${method} Register ${JSON.stringify(
        data,
      )} to data base`,
    );

    const queueMessageLocation = {
      id: storage.id,
      address: storage.address,
    };

    console.time(
      `[INFO]${this.scope}${method} Produce message ${JSON.stringify(
        queueMessageLocation,
      )} to topic ${queueConfig.storageLocationTopic}`,
    );

    await queue.produce(
      queueConfig.storageLocationTopic,
      JSON.stringify(queueMessageLocation),
    );

    console.timeEnd(
      `[INFO]${this.scope}${method} Produce message ${JSON.stringify(
        queueMessageLocation,
      )} to topic ${queueConfig.storageLocationTopic}`,
    );

    const queueMessageCapacity = {
      storageId: storage.id,
      senderId: storage.senderId,
      capacity: storage.capacity,
    };

    console.time(
      `[INFO]${this.scope}${method} Produce message ${JSON.stringify(
        queueMessageCapacity,
      )} to topic ${queueConfig.storageCapacityTopic}`,
    );

    await queue.produce(
      queueConfig.storageCapacityTopic,
      JSON.stringify(queueMessageCapacity),
    );

    console.timeEnd(
      `[INFO]${this.scope}${method} Produce message ${JSON.stringify(
        queueMessageCapacity,
      )} to topic ${queueConfig.storageCapacityTopic}`,
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
