import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';
import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';

export interface ISendersGateway {
  getAll(): Promise<ISendersResponse[] | undefined>;
  getById(request: IGetSendersRequest): Promise<ISendersResponse | undefined>;
}
