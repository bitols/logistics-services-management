import { reportsService } from '@config/rest/config';
import { IReportsRepository } from '@modules/reports/domain/repositories/IReportsRepository';
import rest from '@config/rest';
import { IRegisterStoragesReport } from '@modules/reports/domain/models/requests/IRegisterStoragesReport';
import { IStorageReport } from '@modules/reports/domain/models/entities/IStorageReport';
import { IGetStoragesReport } from '@modules/reports/domain/models/requests/IGetStoragesReport';

export class ReportsRepository implements IReportsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(reportsService.address);
  }
  public async getStoragesReport(
    request: IGetStoragesReport,
  ): Promise<IStorageReport | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStorageReport>(
        `/reports/storages/${request.storagesId}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request storages report: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async registerStoragesReport(request: IStorageReport): Promise<void> {
    try {
      const { status } = await this.restClient.post<void>(
        `/reports/storages`,
        request,
      );

      console.log(
        `request register storage reports: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
