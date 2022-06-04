import { IUpdateSendersRequest } from '@shared-types/senders/domain/models/requests/IUpdateSendersRequest';
import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';

export interface IUpdateSendersUseCase {
  execute(data: IUpdateSendersRequest): Promise<ISendersResponse>;
}
