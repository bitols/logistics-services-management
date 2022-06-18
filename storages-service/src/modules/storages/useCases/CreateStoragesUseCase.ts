import { inject, injectable } from 'tsyringe';
import { ICreateStoragesRequest } from '@shared-types/storages/domain/models/requests/ICreateStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';
import { ICreateStoragesUseCase } from '../domain/useCases/ICreateStoragesUseCase';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';
import kafkaConfig from '@config/kafkaConfig';

@injectable()
export default class CreateStoragesUseCase implements ICreateStoragesUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
    @inject('KafkaQueue')
    private kafkaQueue: KafkaQueue,
  ) {}

  public async execute(
    data: ICreateStoragesRequest,
  ): Promise<IStoragesResponse> {
    const storage = await this.storagesRepository.create(data);

    await this.storagesRepository.save(storage);

    await this.kafkaQueue.startProducer(
      kafkaConfig.storageLocationTopic,
      JSON.stringify({ id: storage.id }),
    );

    return storage as IStoragesResponse;
  }
}
