import { reportsService } from '@config/rest/config';
import { IReportsRepository } from '@modules/reports/domain/repositories/IReportsRepository';
import rest from '@config/rest';
import { IRegisterStoragesReport } from '@modules/reports/domain/models/requests/IRegisterStoragesReport';
import { IStoragesReport } from '@modules/reports/domain/models/responses/IStoragesReport';

export class ReportsRepository implements IReportsRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(reportsService.address);
  }

  public async registerStoragesCapacity(
    request: IRegisterStoragesReport,
  ): Promise<IStoragesReport | undefined> {
    try {
      const { data, status } = await this.restClient.post<IStoragesReport>(
        `/reports/storages-capacity`,
        request,
      );

      console.log(
        `request register storage capacity reports: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
