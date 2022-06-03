import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';

export interface IGetSendersStoragesInfoUseCase {
  execute(data: IGetSendersRequest): Promise<any>;
}
