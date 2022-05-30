import { IReceiversResponse } from '@shared-types/receivers/domain/models/responses/IReceiversResponse';

export interface IGetAllReceiversUseCase {
  execute(): Promise<IReceiversResponse[]>;
}
