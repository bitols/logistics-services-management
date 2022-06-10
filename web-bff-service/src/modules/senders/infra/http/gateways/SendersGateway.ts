import { ISendersGateway } from '@modules/senders/domain/gateways/ISendersGateway';
import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';
import axios from 'axios';

export class SendersGateway implements ISendersGateway {
  public async getAll(): Promise<ISendersResponse[] | undefined> {
    try {
      const { data, status } = await axios.get<ISendersResponse[]>(
        `${process.env.API_SENDERS_ADDRESS}/senders/`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(`request all senders, response status is: ${status}`);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getById(
    request: IGetSendersRequest,
  ): Promise<ISendersResponse | undefined> {
    try {
      const { data, status } = await axios.get<ISendersResponse>(
        `${process.env.API_SENDERS_ADDRESS}/senders/${request.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request sender: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
