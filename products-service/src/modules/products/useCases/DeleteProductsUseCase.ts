import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import kafkaConfig from '@config/kafkaConfig';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';
import { IDeleteProducts } from '../domain/models/requests/IDeleteProducts';

@injectable()
export default class DeleteProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('KafkaQueue')
    private kafkaQueue: KafkaQueue,
  ) {}
  public async execute(data: IDeleteProducts): Promise<void> {
    const product = await this.productsRepository.getById(data.id);

    if (!product) {
      throw new AppErrors('Product not found');
    }

    await this.productsRepository.remove(product);

    await this.kafkaQueue.startProducer(
      kafkaConfig.storageCapacityTopic,
      JSON.stringify({ id: product.storageId }),
    );
  }
}
