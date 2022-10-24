import { inject, injectable } from 'tsyringe';
import { IRegisterStoragesReport } from '../domain/models/requests/IRegisterStoragesReport';
import { IStoragesReportRepository } from '../domain/repositories/IStoragesReportRepository';

@injectable()
export default class RegisterStoragesReportUseCase {
  constructor(
    @inject('StoragesReportRepository')
    private storagesReportRepository: IStoragesReportRepository,
  ) {}

  public async execute(data: IRegisterStoragesReport): Promise<void> {
    let storageReport = await this.storagesReportRepository.getByStorageId(
      data.storageId,
    );

    if (!storageReport) {
      storageReport = await this.storagesReportRepository.create(data);
    } else {
      storageReport.capacity = data.capacity;
      storageReport.stored = data.stored;
      storageReport.usage = data.usage;
      storageReport.products = data.products;
      storageReport.value = data.value;
      storageReport.items = data.items;
    }

    await this.storagesReportRepository.save(storageReport);
  }
}
