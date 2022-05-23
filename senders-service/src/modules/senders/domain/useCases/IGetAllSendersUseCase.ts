import { ISendersResponse } from '../models/responses/ISendersResponse';

export interface IGetAllSendersUseCase {
  execute(): Promise<ISendersResponse[]>;
}
