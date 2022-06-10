import gatewayConfig from '@config/gatewayConfig';
import { IReportsGateway } from '@modules/reports/domain/gateways/IReportsGateway';
import { IGetAllStoragesCapacityBySenderIdRequest } from '@shared-types/reports/domain/models/requests/IGetAllStoragesCapacityBySenderIdRequest';
import { IStoragesCapacityResponse } from '@shared-types/reports/domain/models/responses/IStoragesCapacityResponse';
import axios from 'axios';

export class ReportsGateway implements IReportsGateway {
  public async getAllStoragesCapacityBySender(
    request: IGetAllStoragesCapacityBySenderIdRequest,
  ): Promise<IStoragesCapacityResponse[] | undefined> {
    try {
      const { data, status } = await axios.get<IStoragesCapacityResponse[]>(
        `${gatewayConfig.reportsService.address}/reports/${request.senderId}/storages-capacity`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request all storages capacity reports by sender: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
