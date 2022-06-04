import { ICreateReceiversRequest } from '@shared-types/receivers/domain/models/requests/ICreateReceiversRequest';
import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';

export interface ICreateReceiversUseCase {
  execute(data: ICreateReceiversRequest): Promise<IReceiversResponse>;
}
