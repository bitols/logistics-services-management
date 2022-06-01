import { IStoragesGateway } from '@modules/storages/domain/gateways/IStoragesGateway';
import { IGetAllStoragesBySupplierIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySupplierIdRequest';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
import axios from 'axios';

export class StoragesGateway implements IStoragesGateway {
  public async getAllBySupplier(
    request: IGetAllStoragesBySupplierIdRequest,
  ): Promise<IStoragesResponse[] | undefined> {
    console.log('request all storages by supplier: ', request);

    try {
      const { data, status } = await axios.get<IStoragesResponse[]>(
        `${process.env.API_STORAGES_ADDRESS}/storages/supplier/${request.supplierId}`,
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
    request: IGetStoragesRequest,
  ): Promise<IStoragesResponse | undefined> {
    try {
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
    } catch (error: any) {
      console.error(error.message);
    }
  }
}