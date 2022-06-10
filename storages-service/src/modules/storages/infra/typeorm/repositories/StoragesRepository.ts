import { IStorage } from '@shared-types/storages/domain/models/entities/IStorage';
import { ICreateStoragesRequest } from '@shared-types/storages/domain/models/requests/ICreateStoragesRequest';
import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { getRepository, Repository } from 'typeorm';
import Storage from '../entities/Storage';

export class StoragesRepository implements IStoragesRepository {
  private ormRepository: Repository<Storage>;

  constructor() {
    this.ormRepository = getRepository(Storage);
  }

  public async create(data: ICreateStoragesRequest): Promise<IStorage> {
    console.log(`create storage: ${JSON.stringify(data)}`);

    const storage = this.ormRepository.create(data);

    return storage;
  }

  public async save(storage: IStorage): Promise<IStorage> {
    console.log(`save storage: ${JSON.stringify(storage)}`);

    await this.ormRepository.save(storage);

    return storage;
  }

  public async remove(storage: IStorage): Promise<void> {
    console.log(`remove storage: ${JSON.stringify(storage)}`);

    await this.ormRepository.remove(storage);
  }

  public async getById(id: string): Promise<IStorage | undefined> {
    console.log(`get storage by id: ${id}`);

    const storage = await this.ormRepository.findOne(id);

    return storage;
  }

  public async getAllBySupplier(supplier: string): Promise<IStorage[]> {
    console.log(`get all storages by supplier id: ${supplier}`);

    const storages = await this.ormRepository.find({
      where: {
        supplierId: { $eq: supplier },
      },
    });

    return storages;
  }

  public async getAllBySender(sender: string): Promise<IStorage[]> {
    console.log(`get all storages by sender id: ${sender}`);

    const storages = await this.ormRepository.find({
      where: {
        senderId: { $eq: sender },
      },
    });

    return storages;
  }
}
