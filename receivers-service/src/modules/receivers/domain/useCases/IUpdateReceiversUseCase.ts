import { IUpdateReceiversrequest } from '@shared-types/receivers/domain/models/requests/IUpdateReceiversRequest';
import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';

export interface IUpdateReceiversUseCase {
  execute(data: IUpdateReceiversrequest): Promise<IReceiversResponse>;
}
