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
    const data = request.products?.reduce((pre, cur) => {
      return {
        productId: cur.productId,
        name: cur.name,
        volume: pre.volume + cur.volume,
        value: pre.value + cur.value,
      };
    });

    const capacity = {
      storageId: request.storageId,
      capacity: request.capacity,
      stored: Number((data ? data.volume : 0).toFixed(3)),
      usage: Number(
        (data ? (data.volume * 100) / request.capacity : 0).toFixed(2),
      ),
      products: request.products.length,
      value: Number((data ? data.value : 0).toFixed(2)),
      senderId: request.senderId,
    };

    await this.reportsRepository.registerStoragesCapacity(capacity);
  }
}
