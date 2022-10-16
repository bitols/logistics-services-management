import { inject, injectable } from 'tsyringe';
import { IStorageReport } from '../domain/models/entities/IStorageReport';
import { IStoragesCapacityControl } from '../domain/models/requests/IStoragesCapacityControl';
import { IReportsRepository } from '../domain/repositories/IReportsRepository';
import { recalculateStorageReport } from '../helper/reports.helper';

@injectable()
export default class StoragesCapacityChangeUseCase {
  constructor(
    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute(
    storageCapacity: IStoragesCapacityControl,
  ): Promise<void> {
    let storageReport = await this.reportsRepository.getStoragesReport({
      storagesId: storageCapacity.storageId,
    });

    if (!storageReport) {
      storageReport = this.createNew(storageCapacity);
    } else {
      storageReport.capacity = storageCapacity.capacity;
      if (storageReport.products.length > 0) {
        storageReport.products.forEach(product => {
          product.usage = (product.stored * 100) / storageCapacity.capacity;
        });
        await recalculateStorageReport(storageReport);
      }
    }

    await this.reportsRepository.registerStoragesReport(storageReport);
    console.log(
      `teste de contagem de storage:${JSON.stringify(storageReport)} `,
    );
  }

  createNew(storageCapacity: IStoragesCapacityControl): IStorageReport {
    const newReport: IStorageReport = {
      storageId: storageCapacity.storageId,
      capacity: storageCapacity.capacity,
      senderId: storageCapacity.senderId,
      products: [],
      items: 0,
      stored: 0,
      usage: 0,
      value: 0,
    };
    return newReport;
  }
}
