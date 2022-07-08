import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { KafkaQueue } from '@shared/infra/kafka/KafkaQueue';
import kafkaConfig from '@config/kafkaConfig';
import { IUpdateProducts } from '../domain/models/requests/IUpdateProducts';
import { IProductsResponse } from '../domain/models/responses/IProductsResponse';

@injectable()
export default class UpdateProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('KafkaQueue')
    private kafkaQueue: KafkaQueue,
  ) {}

  public async execute(data: IUpdateProducts): Promise<IProductsResponse> {
    const product = await this.productsRepository.getById(data.id);

    if (!product) {
      throw new AppErrors('Product not found');
    }

    const oldStorageId =
      product.storageId !== data.storageId ? product.storageId : undefined;

    product.name = data.name;
    product.price = data.price;
    product.height = data.height;
    product.lenght = data.lenght;
    product.width = data.width;
    product.price = data.price;
    product.storageId = data.storageId;

    await this.productsRepository.save(product);

    await this.kafkaQueue.startProducer(
      kafkaConfig.storageCapacityTopic,
      JSON.stringify({ id: product.storageId }),
    );

    if (oldStorageId) {
      await this.kafkaQueue.startProducer(
        kafkaConfig.storageCapacityTopic,
        JSON.stringify({ id: oldStorageId }),
      );
    }

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
