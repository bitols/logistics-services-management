import AppErrors from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';
import { IGetAllStoragesBySupplierId } from '../domain/models/requests/IGetAllStoragesBySupplierId';
import { IStorages } from '../domain/models/responses/IStorages';
import { IStoragesRepository } from '../domain/repositories/IStoragesRepository';

@injectable()
export default class GetAllStoragesBySupplierIdUseCase {
  constructor(
    @inject('StoragesRepository')
    private storagesRepository: IStoragesRepository,
  ) {}

  public async execute(
    data: IGetAllStoragesBySupplierId,
  ): Promise<IStorages[]> {
    const storages = await this.storagesRepository.getAllBySupplier(
      data.supplierId,
    );

    if (!storages.length) {
      throw new AppErrors('Storages not found');
    }

    return storages.map(storage => {
      return {
        id: storage.id,
        name: storage.name,
        email: storage.email,
        address: storage.address,
        capacity: storage.capacity,
        phone: storage.phone,
        supplierId: storage.supplierId,
        senderId: storage.senderId,
        location: storage.location,
      };
    });
  }
}
