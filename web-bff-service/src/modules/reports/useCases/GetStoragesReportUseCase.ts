import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetStoragesReport } from '../domain/models/requests/IGetStoragesReport';
import { IStoragesReport } from '../domain/models/responses/IStoragesReport';
import { IReportsRepository } from '../domain/repositories/IReportsRepository';

@injectable()
export default class GetStoragesReportUseCase {
  private scope = '[GetStoragesReportUseCase]';
  constructor(
    @inject('ReportsRepository')
    private reportsRepository: IReportsRepository,
  ) {}

  public async execute(data: IGetStoragesReport): Promise<IStoragesReport> {
    const method = '[execute]';
    console.time(
      `[INFO]${this.scope}${method} Request ${JSON.stringify(
        data,
      )} from service`,
    );
    const report = await this.reportsRepository.getStoragesReport(data);

    if (!report) {
      console.timeEnd(
        `[INFO]${this.scope}${method} Request ${JSON.stringify(
          data,
        )} from service`,
      );
      throw new AppErrors('Storage not found');
    }
    console.timeEnd(
      `[INFO]${this.scope}${method} Request ${JSON.stringify(
        data,
      )} from service`,
    );
    return report as IStoragesReport;
  }
}
