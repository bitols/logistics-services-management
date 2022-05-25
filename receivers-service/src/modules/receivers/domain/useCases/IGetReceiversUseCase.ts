import { IGetReceiversRequest } from '../models/requests/IGetReceiversRequest';
import { IReceiversResponse } from '../models/responses/IReceiversResponse';

export interface IGetReceiversUseCase {
  execute(data: IGetReceiversRequest): Promise<IReceiversResponse>;
}
