import { IReceiversResponse } from '../models/responses/IReceiversResponse';

export interface IGetAllReceiversUseCase {
  execute(): Promise<IReceiversResponse[]>;
}
