import rest from '@config/rest';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { IGetAllStoragesBySenderIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySenderIdRequests';
import { IGetAllStoragesBySupplierIdRequest } from '@shared-types/storages/domain/models/requests/IGetAllStoragesBySupplierIdRequest';
import { IGetStoragesRequest } from '@shared-types/storages/domain/models/requests/IGetStoragesRequest';
import { IStoragesResponse } from '@shared-types/storages/domain/models/responses/IStoragesResponse';
export class StoragesRepository implements IStoragesRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Senders);
  }
  public async getAllBySender(
    request: IGetAllStoragesBySenderIdRequest,
  ): Promise<IStoragesResponse[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStoragesResponse[]>(
        `/storages/senders/${request.senderId}`,
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
      const { data, status } = await this.restClient.get<IStoragesResponse[]>(
        `/storages/suppliers/${request.supplierId}`,
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
      const { data, status } = await this.restClient.get<IStoragesResponse>(
        `/storages/${request.id}`,
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
