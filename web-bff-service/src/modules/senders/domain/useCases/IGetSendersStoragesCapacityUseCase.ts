import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';

export interface IGetSendersStoragesCapacityUseCase {
  execute(data: IGetSendersRequest): Promise<any>;
}
