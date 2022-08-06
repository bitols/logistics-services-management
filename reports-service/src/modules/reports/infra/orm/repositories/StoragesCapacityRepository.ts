import { IStoragesCapacityRepository } from '@modules/reports/domain/repositories/IStoragesCapacityRepository';
import StorageCapacity from '../entities/StorageCapacity';
import { dataSource } from '@config/orm';
import { IRegisterStoragesCapacity } from '@modules/reports/domain/models/requests/IRegisterStoragesCapacity';
import { IStorageCapacity } from '@modules/reports/domain/models/entities/IStorageCapacity';

export class StoragesCapacityRepository implements IStoragesCapacityRepository {
  private ormRepository;
  constructor() {
    this.ormRepository = dataSource.getRepository(StorageCapacity);
  }

  public async create(
    data: IRegisterStoragesCapacity,
  ): Promise<IStorageCapacity> {
    console.log(`create storage capacity reports: ${JSON.stringify(data)}`);

    const storageCapacity = this.ormRepository.create(data);

    return storageCapacity;
  }

  public async save(
    storageCapacity: IStorageCapacity,
  ): Promise<IStorageCapacity> {
    console.log(
      `save storage capacity reports: ${JSON.stringify(storageCapacity)}`,
    );

    await this.ormRepository.save(storageCapacity);

    return storageCapacity;
  }

  public async getByStorageId(
    storage: string,
  ): Promise<IStorageCapacity | null | undefined> {
    console.log(`get storage capacity reports by storageId: ${storage}`);

    const storageCapacity = await this.ormRepository.findOneBy({
      storageId: storage,
    });

    return storageCapacity;
  }

  public async getAllBySender(sender: string): Promise<IStorageCapacity[]> {
    console.log(`get all storages capacity reports by senderId: ${sender}`);

    const storagesCapacity = await this.ormRepository.findBy({
      senderId: sender,
    });

    return storagesCapacity;
  }
}
