import gatewayConfig from '@config/gatewayConfig';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { IGetStorages } from '@modules/storages/domain/models/requests/IGetStorages';
import { IUpdateStoragesLocation } from '@modules/storages/domain/models/requests/IUpdateStoragesLocation';
import { IStorages } from '@modules/storages/domain/models/responses/IStorages';
import axios from 'axios';

export class StoragesGateway implements IStoragesGateway {
  public async updateLocation(
    request: IUpdateStoragesLocation,
  ): Promise<IStorages | undefined> {
    try {
      const { data, status } = await axios.patch<IStorages>(
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

  public async getById(request: IGetStorages): Promise<IStorages | undefined> {
    try {
      const { data, status } = await axios.get<IStorages>(
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
      console.log(error.message);
    }
  }
}
