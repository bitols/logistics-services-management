import { storagesService } from '@config/rest/config';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { IGetStorages } from '@modules/storages/domain/models/requests/IGetStorages';
import { IUpdateStoragesLocation } from '@modules/storages/domain/models/requests/IUpdateStoragesLocation';
import { IStorages } from '@modules/storages/domain/models/responses/IStorages';
import rest from '@config/rest';

export class StoragesRepository implements IStoragesRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(storagesService.address);
  }

  public async updateLocation(
    request: IUpdateStoragesLocation,
  ): Promise<IStorages | undefined> {
    try {
      const { data, status } = await this.restClient.patch<IStorages>(
        `/storages/${request.id}/location`,
        { location: request.location },
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
      const { data, status } = await this.restClient.get<IStorages>(
        `/storages/${request.id}`,
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
