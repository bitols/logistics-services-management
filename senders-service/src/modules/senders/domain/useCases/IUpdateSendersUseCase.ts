import { IUpdateSendersRequest } from '../models/requests/IUpdateSendersRequest';
import { ISendersResponse } from '../models/responses/ISendersResponse';

export interface IUpdateSendersUseCase {
  execute(data: IUpdateSendersRequest): Promise<ISendersResponse>;
}
