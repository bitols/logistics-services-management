import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import axios from 'axios';

export class StoragesGateway implements IStoragesGateway {
  public async getById(
    request: IGetStoragesRequest,
  ): Promise<IStoragesResponse | undefined> {
    console.log('request storage by id: ', request);

    try {
      const { data, status } = await axios.get<IStoragesResponse>(
        `${process.env.API_STORAGES_ADDRESS}/storages/${request.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log('response status is: ', status);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
