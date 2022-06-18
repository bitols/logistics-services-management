import { IUpdateStorageLocationUseCase } from '../domain/useCases/IUpdateStoragesLocationUseCase';

export class UpdateStoragesLocationUseCase
  implements IUpdateStorageLocationUseCase
{
  public async execute(request: {
    id: string;
    message: string;
  }): Promise<void> {
    console.log(request);
  }
}
