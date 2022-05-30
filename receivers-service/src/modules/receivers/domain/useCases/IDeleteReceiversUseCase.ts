import { IDeleteReceiversRequest } from '@shared-types/receivers/domain/models/requests/IDeleteReceiversRequest';

export interface IDeleteReceiversUseCase {
  execute(data: IDeleteReceiversRequest): Promise<void>;
}
