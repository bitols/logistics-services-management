import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStoragesReport } from '../domain/models/requests/IGetStoragesReport';
import { IStoragesReport } from '../domain/models/responses/IStoragesReport';
import { IStoragesReportRepository } from '../domain/repositories/IStoragesReportRepository';

@injectable()
export default class GetStoragesReportUseCase {
  private scope = '[GetStoragesReportUseCase]';
  constructor(
    @inject('StoragesReportRepository')
    private storagesReportRepository: IStoragesReportRepository,
  ) {}

  public async execute(data: IGetStoragesReport): Promise<IStoragesReport> {
    const method = '[execute]';

    console.time(
      `[INFO]${this.scope}${method} Request ${JSON.stringify(
        data,
      )} from data base`,
    );
    const storagesReport = await this.storagesReportRepository.getByStorageId(
      data.storageId,
    );
    if (!storagesReport) {
      console.timeEnd(
        `[INFO]${this.scope}${method} Request ${JSON.stringify(
          data,
        )} from data base`,
      );
      throw new AppErrors('Storages report not found');
    }

    console.timeEnd(
      `[INFO]${this.scope}${method} Request ${JSON.stringify(
        data,
      )} from data base`,
    );
    return storagesReport as IStoragesReport;
  }
}
