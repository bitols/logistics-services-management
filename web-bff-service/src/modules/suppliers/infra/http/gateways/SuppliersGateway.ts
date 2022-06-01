import { ISuppliersGateway } from '@modules/suppliers/domain/gateways/ISuppliersGateway';
import { IGetSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/IGetSuppliersRequest';
import { ISuppliersResponse } from '@shared-types/suppliers/domain/models/responses/ISuppliersResponse';
import axios from 'axios';

export class SuppliersGateway implements ISuppliersGateway {
  public async getAll(): Promise<ISuppliersResponse[] | undefined> {
    console.log('request all suppliers');

    try {
      const { data, status } = await axios.get<
        ISuppliersResponse[] | undefined
      >(`${process.env.API_SUPPLIERS_ADDRESS}/suppliers/`, {
        headers: {
          Accept: 'application/json',
        },
      });

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"
      console.log('response status is: ', status);

      return data;
    } catch (error: any) {
      console.error(error.message);
    }
  }

  public async getById(
    request: IGetSuppliersRequest,
  ): Promise<ISuppliersResponse | undefined> {
    console.log('request supplier: ', request);
    try {
      const { data, status } = await axios.get<ISuppliersResponse | undefined>(
        `${process.env.API_SUPPLIERS_ADDRESS}/suppliers/${request.id}`,
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
