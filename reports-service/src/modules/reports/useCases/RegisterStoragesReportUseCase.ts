import { inject, injectable } from 'tsyringe';
import { IRegisterStoragesReport } from '../domain/models/requests/IRegisterStoragesReport';
import { IStoragesReportRepository } from '../domain/repositories/IStoragesReportRepository';

@injectable()
export default class RegisterStoragesReportUseCase {
  private scope = '[RegisterStoragesReportUseCase]';
  constructor(
    @inject('StoragesReportRepository')
    private storagesReportRepository: IStoragesReportRepository,
  ) {}

  public async execute(data: IRegisterStoragesReport): Promise<void> {
    const method = '[execute]';

    console.time(
      `[INFO]${this.scope}${method} Register ${JSON.stringify(
        data,
      )} to data base`,
    );
    let storageReport = await this.storagesReportRepository.getByStorageId(
      data.storageId,
    );

    if (!storageReport) {
      console.timeEnd(
        `[INFO]${this.scope}${method} Register ${JSON.stringify(
          data,
        )} to data base`,
      );
      storageReport = await this.storagesReportRepository.create(data);
    } else {
      storageReport.capacity = data.capacity;
      storageReport.stored = data.stored;
      storageReport.usage = data.usage;
      storageReport.products = data.products;
      storageReport.value = data.value;
      storageReport.items = data.items;
    }
    console.timeEnd(
      `[INFO]${this.scope}${method} Register ${JSON.stringify(
        data,
      )} to data base`,
    );
    await this.storagesReportRepository.save(storageReport);
  }
}
