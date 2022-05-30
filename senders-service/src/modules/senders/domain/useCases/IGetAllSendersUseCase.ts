import { ISendersResponse } from '@shared-types/senders/domain/models/responses/ISendersResponse';

export interface IGetAllSendersUseCase {
  execute(): Promise<ISendersResponse[]>;
}
