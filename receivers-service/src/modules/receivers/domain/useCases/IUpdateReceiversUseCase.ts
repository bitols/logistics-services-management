import { IUpdateReceiversrequest } from '../models/requests/IUpdateReceiversRequest';
import { IReceiversResponse } from '../models/responses/IReceiversResponse';

export interface IUpdateReceiversUseCase {
  execute(data: IUpdateReceiversrequest): Promise<IReceiversResponse>;
}
