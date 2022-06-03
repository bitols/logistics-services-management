import { IGetSendersRequest } from '@shared-types/senders/domain/models/requests/IGetSendersRequest';

export interface IGetSendersProductsUseCase {
  execute(data: IGetSendersRequest): Promise<any>;
}
