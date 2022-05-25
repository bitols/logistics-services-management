import { IDeleteReceiversRequest } from '../models/requests/IDeleteReceiversRequest';

export interface IDeleteReceiversUseCase {
  execute(data: IDeleteReceiversRequest): Promise<void>;
}
