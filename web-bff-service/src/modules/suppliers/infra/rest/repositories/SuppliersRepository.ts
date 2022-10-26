import rest from '@config/rest';
import { IGetSuppliers } from '@modules/suppliers/domain/models/requests/IGetSuppliers';
import { ISuppliers } from '@modules/suppliers/domain/models/responses/ISuppliers';
import { ISuppliersRepository } from '@modules/suppliers/domain/repositories/ISuppliersRepository';

export class SuppliersRepository implements ISuppliersRepository {
  private restClient;
  constructor() {
    this.restClient = rest.getHttpClient(rest.Services.Suppliers);
  }
  public async getAll(): Promise<ISuppliers[] | undefined> {
    try {
      const { data, status } = await this.restClient.get<
        ISuppliers[] | undefined
      >('/suppliers/', {
        headers: {
          Accept: 'application/json',
        },
      });
      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getById(
    request: IGetSuppliers,
  ): Promise<ISuppliers | undefined> {
    try {
      const { data, status } = await this.restClient.get<
        ISuppliers | undefined
      >(`/suppliers/${request.id}`, {
        headers: {
          Accept: 'application/json',
        },
      });

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}
