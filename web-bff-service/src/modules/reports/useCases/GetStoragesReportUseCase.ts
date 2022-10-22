import { inject, injectable } from 'tsyringe';
import { IGetStoragesReport } from '../domain/models/requests/IGetStoragesReport';
import { IStoragesReport } from '../domain/models/responses/IStoragesReport';
import { IReportsRepository } from '../domain/repositories/IReportsRepository';

@injectable()
export default class GetStoragesReportUseCase {
  constructor(
    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute(data: IGetStoragesReport): Promise<IStoragesReport> {
    const report = await this.reportsRepository.getStoragesReport(data);
    return report as IStoragesReport;
  }
}
