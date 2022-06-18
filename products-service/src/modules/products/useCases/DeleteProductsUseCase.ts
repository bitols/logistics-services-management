import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IDeleteProductsRequest } from '@shared-types/products/domain/models/requests/IDeleteProductsRequest';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IDeleteProductsUseCase } from '../domain/useCases/IDeleteProductsUseCase';
import kafkaConfig from '@config/kafkaConfig';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';

@injectable()
export default class DeleteProductsUseCase implements IDeleteProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('KafkaQueue')
    private kafkaQueue: KafkaQueue,
  ) {}
  public async execute(data: IDeleteProductsRequest): Promise<void> {
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
