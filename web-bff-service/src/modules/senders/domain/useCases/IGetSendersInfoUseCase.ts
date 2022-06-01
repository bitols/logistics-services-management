import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';

export interface IGetSendersInfoUseCase {
  execute(data: IGetSendersRequest): Promise<any>;
}
