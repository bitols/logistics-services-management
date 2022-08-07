import { inject, injectable } from 'tsyringe';
import { IReportsRepository } from '../domain/repositories/IReportsRepository';
import { IGenerateStoragesReport } from '../domain/models/requests/IGenerateStoragesReport';
@injectable()
export default class GenerateStoragesCapacitysUseCase {
  constructor(
    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute(request: IGenerateStoragesReport): Promise<void> {
    const data = request.products
      ?.map(attribute => {
        return {
          volume: attribute.height * attribute.width * attribute.lenght,
          value: attribute.price,
        };
      })
      .reduce((pre, cur) => {
        return {
          volume: pre.volume + cur.volume,
          value: pre.value + cur.value,
        };
      });

    const capacity = {
      storageId: request.storageId,
      capacity: request.capacity,
      stored: data ? Number(data.volume.toFixed(3)) : 0,
      usage: data
        ? Number(((data.volume * 100) / request.capacity).toFixed(2))
        : 0,
      products: request.products.length,
      value: data ? Number(data.value.toFixed(2)) : 0,
      senderId: request.senderId,
    };

    await this.reportsRepository.registerStoragesCapacity(capacity);
  }
}
