import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';
import { IGetReceiversRequest } from '@shared-types/receivers/domain/models/requests/IGetReceiversRequest';

export interface IReceiversGateway {
  getById(
    request: IGetReceiversRequest,
  ): Promise<IReceiversResponse | undefined>;
  getAll(): Promise<IReceiversResponse[] | undefined>;
}
