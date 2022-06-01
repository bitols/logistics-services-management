import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import axios from 'axios';

export class StoragesGateway implements IStoragesGateway {
  public async getAll(): Promise<IStoragesResponse[]> {
    const { data, status } = await axios.get<IStoragesResponse[]>(
      `${process.env.API_STORAGES_ADDRESS}/storages/`,
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
  }
  public async getById(
    request: IGetStoragesRequest,
  ): Promise<IStoragesResponse> {
    const { data, status } = await axios.get<IStoragesResponse>(
      `${process.env.API_STORAGES_ADDRESS}/storages/${request.id}`,
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
  }
}
