import { ICreateSendersRequest } from '../models/requests/ICreateSendersRequest';
import { ISendersResponse } from '../models/responses/ISendersResponse';

export interface ICreateSendersUseCase {
  execute(data: ICreateSendersRequest): Promise<ISendersResponse>;
}
