import { IDeleteStoragesRequest } from '../models/requests/IDeleteStoragesRequest';

export interface IDeleteStoragesUseCase {
  execute(data: IDeleteStoragesRequest): Promise<void>;
}
