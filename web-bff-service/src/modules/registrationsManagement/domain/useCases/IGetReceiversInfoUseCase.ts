import { IGetReceiversRequest } from '@shared-types/receivers/domain/models/requests/IGetReceiversRequest';
import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';

export interface IGetReceiversInfoUseCase {
  execute(data: IGetReceiversRequest): Promise<IReceiversResponse>;
}
