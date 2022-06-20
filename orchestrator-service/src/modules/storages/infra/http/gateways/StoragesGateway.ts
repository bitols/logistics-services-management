import gatewayConfig from '@config/gatewayConfig';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';

import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IUpdateStoragesLocationRequest } from '@shared-types/storages/domain/models/requests/IUpdateStoragesLocationRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import axios from 'axios';

export class StoragesGateway implements IStoragesGateway {
  public async updateLocation(
    request: IUpdateStoragesLocationRequest,
  ): Promise<IStoragesResponse | undefined> {
    try {
      const { data, status } = await axios.patch<IStoragesResponse>(
        `${gatewayConfig.storagesService.address}/storages/${request.id}/location`,
        { location: request.location },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request update Location storage: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getById(
    request: IGetStoragesRequest,
  ): Promise<IStoragesResponse | undefined> {
    try {
      const { data, status } = await axios.get<IStoragesResponse>(
        `${gatewayConfig.storagesService.address}/storages/${request.id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request storage: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
