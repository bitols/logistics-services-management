import { IGetSendersRequest } from '../models/requests/IGetSendersRequest';
import { ISendersResponse } from '../models/responses/ISendersResponse';

export interface IGetSendersUseCase {
  execute(data: IGetSendersRequest): Promise<ISendersResponse>;
}
