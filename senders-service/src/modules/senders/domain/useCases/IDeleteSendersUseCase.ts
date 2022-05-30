import { IDeleteSendersRequest } from '@shared-types/senders/domain/models/requests/IDeleteSendersRequests';

export interface IDeleteSendersUseCase {
  execute(data: IDeleteSendersRequest): Promise<void>;
}
