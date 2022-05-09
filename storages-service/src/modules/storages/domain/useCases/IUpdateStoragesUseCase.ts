import { IUpdateStoragesRequest } from '../models/requests/IUpdateStoragesRequest';
import { IStoragesResponse } from '../models/responses/IStoragesResponse';

export interface IUpdateStoragesUseCase {
  execute(data: IUpdateStoragesRequest): Promise<IStoragesResponse>;
}
