import { ICreateSendersRequest } from '@shared-types/senders/domain/models/requests/ICreateSendersRequest';
import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';

export interface ICreateSendersUseCase {
  execute(data: ICreateSendersRequest): Promise<ISendersResponse>;
}
