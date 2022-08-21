import rest from '@config/rest';
import { IGetStorages } from '@modules/storages/domain/models/requests/IGetStorages';
import { IGetStoragesBySender } from '@modules/storages/domain/models/requests/IGetStoragesBySender';
import { IGetStoragesBySupplier } from '@modules/storages/domain/models/requests/IGetStoragesBySupplier';
import { IStorages } from '@modules/storages/domain/models/responses/IStorages';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';

export class StoragesRepository implements IStoragesRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Storages);
  }
  public async getAllBySender(
    request: IGetStoragesBySender,
  ): Promise<IStorages[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStorages[]>(
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
    request: IGetStoragesBySupplier,
  ): Promise<IStorages[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStorages[]>(
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

  public async getById(request: IGetStorages): Promise<IStorages | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStorages>(
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