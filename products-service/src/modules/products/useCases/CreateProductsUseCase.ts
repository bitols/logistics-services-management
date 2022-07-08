import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';
import kafkaConfig from '@config/kafkaConfig';
import { IProductsResponse } from '../domain/models/responses/IProductsResponse';
import { ICreateProducts } from '../domain/models/requests/ICreateProducts';

@injectable()
export default class CreateProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('KafkaQueue')
    private kafkaQueue: KafkaQueue,
  ) {}

  public async execute(data: ICreateProducts): Promise<IProductsResponse> {
    const product = await this.productsRepository.create(data);

    await this.productsRepository.save(product);

    await this.kafkaQueue.startProducer(
      kafkaConfig.storageCapacityTopic,
      JSON.stringify({ id: product.storageId }),
    );

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      height: product.height,
      lenght: product.lenght,
      width: product.width,
      senderId: product.senderId,
      storageId: product.storageId,
    };
  }
}
