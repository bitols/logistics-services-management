import { inject, injectable } from 'tsyringe';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';
import kafkaConfig from '@config/kafkaConfig';
import { ICreateStorages } from '../domain/models/requests/ICreateStorages';
import { IStorages } from '../domain/models/responses/IStorages';
import Storage from '../infra/orm/entities/Storage';

@injectable()
export default class CreateStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
    @inject('KafkaQueue')
    private kafkaQueue: KafkaQueue,
  ) {}

  public async execute(data: ICreateStorages): Promise<IStorages> {
    const storage = await this.storagesRepository.create(data);

    await this.storagesRepository.save(storage);

    await this.kafkaQueue.startProducer(
      kafkaConfig.storageLocationTopic,
      JSON.stringify({
        id: storage.id,
        address: storage.address,
      }),
    );

    await this.kafkaQueue.startProducer(
      kafkaConfig.storageCapacityTopic,
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
