import rest from '@config/rest';
import { ICreateStorageProducts } from '@modules/storages/domain/models/requests/ICreateStorageProducts';
import { ICreateStorages } from '@modules/storages/domain/models/requests/ICreateStorages';
import { IDeleteStorageProducts } from '@modules/storages/domain/models/requests/IDeleteStorageProducts';
import { IDeleteStorages } from '@modules/storages/domain/models/requests/IDeleteStorages';
import { IGetStorages } from '@modules/storages/domain/models/requests/IGetStorages';
import { IGetStoragesBySender } from '@modules/storages/domain/models/requests/IGetStoragesBySender';
import { IGetStoragesBySupplier } from '@modules/storages/domain/models/requests/IGetStoragesBySupplier';
import { IStorageProducts } from '@modules/storages/domain/models/responses/IStorageProducts';
import { IStorages } from '@modules/storages/domain/models/responses/IStorages';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';

export class StoragesRepository implements IStoragesRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Storages);
  }

  public async delete(request: IDeleteStorages): Promise<void> {
    try {
      const { status } = await this.restClient.delete<void>(
        `/storages/${request.id}`,
      );

      console.log(
        `delete storage: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async getAllByName(
    request: IGetStoragesBySender,
  ): Promise<IStorages[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStorages[]>(
        `/storages/senders/${request.senderId}`,
        {
          headers: {
            Accept: 'application/json',
          },
          params: {
            name: request.name,
          },
        },
      );

      console.log(
        `request all storages by name: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async rmvProducts(request: IDeleteStorageProducts): Promise<void> {
    try {
      const { status } = await this.restClient.delete<void>(
        `/storages/products/`,
        {
          data: request,
        },
      );

      console.log(
        `remove product from storage: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async addProducts(
    request: ICreateStorageProducts,
  ): Promise<IStorageProducts | undefined> {
    try {
      const { data, status } = await this.restClient.post<IStorageProducts>(
        `/storages/products`,
        request,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      console.log(
        `add product on storage: ${JSON.stringify(
          request,
        )}, response status is: ${status}`,
      );

      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  public async getProducts(
    request: IGetStorages,
  ): Promise<IStorageProducts[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<IStorageProducts[]>(
        `/storages/${request.id}/products`,
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

  public async create(
    request: ICreateStorages,
  ): Promise<IStorages | undefined> {
    try {
      const { data, status } = await this.restClient.post<IStorages>(
        '/storages/',
        request,
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
