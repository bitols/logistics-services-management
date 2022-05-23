import { IDeleteSendersRequest } from '../models/requests/IDeleteSendersRequests';

export interface IDeleteSendersUseCase {
  execute(data: IDeleteSendersRequest): Promise<void>;
}
