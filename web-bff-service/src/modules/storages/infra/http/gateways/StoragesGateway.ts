import gatewayConfig from '@config/gatewayConfig';
import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { IGetAllStoragesBySenderIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySenderIdRequests';
import { IGetAllStoragesBySupplierIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySupplierIdRequest';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import axios from 'axios';

export class StoragesGateway implements IStoragesGateway {
  public async getAllBySender(
    request: IGetAllStoragesBySenderIdRequest,
  ): Promise<IStoragesResponse[] | undefined> {
    try {
      const { data, status } = await axios.get<IStoragesResponse[]>(
        `${gatewayConfig.storagesService.address}/storages/senders/${request.senderId}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request all storages by sender: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getAllBySupplier(
    request: IGetAllStoragesBySupplierIdRequest,
  ): Promise<IStoragesResponse[] | undefined> {
    try {
      const { data, status } = await axios.get<IStoragesResponse[]>(
        `${gatewayConfig.storagesService.address}/storages/suppliers/${request.supplierId}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `request all storages by supplier: ${JSON.stringify(
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
