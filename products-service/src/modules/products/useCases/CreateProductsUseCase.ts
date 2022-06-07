import { inject, injectable } from 'tsyringe';
import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import { IProductsResponse } from '@shared-types/products/domain/models/responses/IProductsResponse';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { ICreateProductUseCase } from '../domain/useCases/ICreateProductsUseCase';
import kafkaConfig from '@config/kafkaConfig';
import { KafkaQueue } from '@shared/infra/queue/KafkaQueue';

@injectable()
export default class CreateProductsUseCase implements ICreateProductUseCase {
  private kafkaQueue: KafkaQueue;

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {
    this.kafkaQueue = new KafkaQueue();
  }

  public async execute(
    data: ICreateProductsRequest,
  ): Promise<IProductsResponse> {
    const product = await this.productsRepository.create(data);

    await this.productsRepository.save(product);

    await this.kafkaQueue.send(
      kafkaConfig.storageControlTopic,
      JSON.stringify({ id: product.storageId }),
    );

    console.log(
      `producing on kafka,
      topic: ${kafkaConfig.storageControlTopic}`,
    );
    return product as IProductsResponse;
  }
}
