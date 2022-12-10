import { storagesService } from '@config/rest/config';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { IGetStorages } from '@modules/storages/domain/models/requests/IGetStorages';
import { IUpdateStoragesLocation } from '@modules/storages/domain/models/requests/IUpdateStoragesLocation';
import { IStorages } from '@modules/storages/domain/models/responses/IStorages';
import rest from '@config/rest';
import { IStorageProducts } from '@modules/storages/domain/models/responses/IStorageProducts';

export class StoragesRepository implements IStoragesRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(storagesService.address);
  }

  public async getProducts(
    request: IGetStorages,
  ): Promise<IStorageProducts[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStorageProducts[]>(
        `/storages/${request.id}/products`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async updateLocation(
    request: IUpdateStoragesLocation,
  ): Promise<IStorages | undefined> {
    try {
      const { data, status } = await this.restClient.patch<IStorages>(
        `/storages/${request.id}/location`,
        { location: request.location },
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

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
