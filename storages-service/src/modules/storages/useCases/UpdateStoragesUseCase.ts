import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IUpdateStoragesRequest } from '@shared-types/storages/domain/models/requests/IUpdateStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { IUpdateStoragesUseCase } from '../domain/useCases/IUpdateStoragesUseCase';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';
import kafkaConfig from '@config/kafkaConfig';

@injectable()
export default class UpdateStoragesUseCase implements IUpdateStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
    @inject('KafkaQueue')
    private kafkaQueue: KafkaQueue,
  ) {}

  public async execute(
    data: IUpdateStoragesRequest,
  ): Promise<IStoragesResponse> {
    const storage = await this.storagesRepository.getById(data.id);

    if (!storage) {
      throw new AppErrors('Storage not found');
    }

    const changedAddress = storage.address !== data.address;

    storage.name = data.name;
    storage.email = data.email;
    storage.phone = data.phone;
    storage.address = data.address;
    storage.capacity = data.capacity;

    await this.storagesRepository.save(storage);

    if (changedAddress) {
      await this.kafkaQueue.startProducer(
        kafkaConfig.storageLocationTopic,
        JSON.stringify({
          id: storage.id,
          address: storage.address,
        }),
      );
    }

    return storage as IStoragesResponse;
  }
}
