import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStoragesReport } from '../domain/models/requests/IGetStoragesReport';
import { IStoragesReport } from '../domain/models/responses/IStoragesReport';
import { IStoragesReportRepository } from '../domain/repositories/IStoragesReportRepository';

@injectable()
export default class GetStoragesReportUseCase {
  constructor(
    @inject('StoragesReportRepository')
    private storagesReportRepository: IStoragesReportRepository,
  ) {}

  public async execute(data: IGetStoragesReport): Promise<IStoragesReport> {
    const storagesReport = await this.storagesReportRepository.getByStorageId(
      data.storageId,
    );
    if (!storagesReport) {
      throw new AppErrors('Storages report not found');
    }

    return storagesReport as IStoragesReport;
  }
}
