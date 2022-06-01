import { ISendersGateway } from '@modules/senders/domain/gateways/ISendersGateway';
import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';
import axios from 'axios';

export class SendersGateway implements ISendersGateway {
  public async getAll(): Promise<ISendersResponse[] | undefined> {
    console.log('request all senders');

    try {
      const { data, status } = await axios.get<ISendersResponse[]>(
        `${process.env.API_SENDERS_ADDRESS}/senders/`,
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

  public async getById(
    request: IGetSendersRequest,
  ): Promise<ISendersResponse | undefined> {
    console.log('request sender: ', request);
    try {
      const { data, status } = await axios.get<ISendersResponse>(
        `${process.env.API_SENDERS_ADDRESS}/senders/${request.id}`,
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
