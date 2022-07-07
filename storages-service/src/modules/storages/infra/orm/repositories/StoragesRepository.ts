import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import { Repository } from 'typeorm';
import Storage from '../entities/Storage';
import { dataSource } from '@shared/infra/orm';
import { ICreateStorages } from '@modules/storages/domain/models/requests/ICreateStorages';
import { IStorage } from '@modules/storages/domain/models/entities/IStorage';

export class StoragesRepository implements IStoragesRepository {
  private ormRepository: Repository<Storage>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Storage);
  }

  public async create(data: ICreateStorages): Promise<IStorage> {
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

  public async getById(id: string): Promise<IStorage | null | undefined> {
    console.log(`get storage by id: ${id}`);

    const storage = await this.ormRepository.findOneById(id);

    return storage;
  }

  public async getAllBySupplier(supplier: string): Promise<IStorage[]> {
    console.log(`get all storages by supplier id: ${supplier}`);

    const storages = await this.ormRepository.findBy({
      supplierId: supplier,
    });

    return storages;
  }

  public async getAllBySender(sender: string): Promise<IStorage[]> {
    console.log(`get all storages by sender id: ${sender}`);

    const storages = await this.ormRepository.findBy({
      senderId: sender,
    });

    return storages;
  }
}
