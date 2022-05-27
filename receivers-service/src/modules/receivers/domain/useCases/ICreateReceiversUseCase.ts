import { ICreateReceiversRequest } from '../models/requests/ICreateReceiversRequest';
import { IReceiversResponse } from '../models/responses/IReceiversResponse';

export interface ICreateReceiversUseCase {
  execute(data: ICreateReceiversRequest): Promise<IReceiversResponse>;
}
