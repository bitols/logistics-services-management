import { IGetStoragesRequest } from '../models/requests/IGetStoragesRequest';
import { IStoragesResponse } from '../models/responses/IStoragesResponse';

export interface IGetStoragesUseCase {
  execute(data: IGetStoragesRequest): Promise<IStoragesResponse>;
}
