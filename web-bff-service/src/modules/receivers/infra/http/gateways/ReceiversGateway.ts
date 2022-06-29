import gatewayConfig from '@config/gatewayConfig';
import { IReceiversGateway } from '@modules/receivers/domain/gateways/IReceiversGateway';
import { IGetReceiversRequest } from '@shared-types/receivers/domain/models/requests/IGetReceiversRequest';
import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';
import axios from 'axios';

export class ReceiversGateway implements IReceiversGateway {
  public async getById(
    request: IGetReceiversRequest,
  ): Promise<IReceiversResponse | undefined> {
    console.log('request receiver: ', request);

    try {
      const { data, status } = await axios.get<IReceiversResponse>(
        `${gatewayConfig.receiversService.address}/receivers/${request.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request create product: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getAll(): Promise<IReceiversResponse[] | undefined> {
    console.log('request all receivers');

    try {
      const { data, status } = await axios.get<IReceiversResponse[]>(
        `${process.env.API_RECEIVERS_ADDRESS}/receivers/`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
