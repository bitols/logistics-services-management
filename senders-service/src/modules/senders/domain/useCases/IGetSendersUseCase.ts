import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';
import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';

export interface IGetSendersUseCase {
  execute(data: IGetSendersRequest): Promise<ISendersResponse>;
}
