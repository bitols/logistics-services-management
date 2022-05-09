import { ICreateStoragesRequest } from '../models/requests/ICreateStoragesRequest';
import { IStoragesResponse } from '../models/responses/IStoragesResponse';

export interface ICreateStoragesUseCase {
  execute(data: ICreateStoragesRequest): Promise<IStoragesResponse>;
}
