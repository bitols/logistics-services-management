import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';

export interface IGetStoragesCapacityBySenderUseCase {
  execute(data: IGetSendersRequest): Promise<any>;
}
