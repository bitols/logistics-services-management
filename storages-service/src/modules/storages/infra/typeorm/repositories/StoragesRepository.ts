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
    const storage = this.ormRepository.create(data);

    return storage;
  }

  public async save(storage: IStorage): Promise<IStorage> {
    await this.ormRepository.save(storage);

    return storage;
  }

  public async remove(storage: IStorage): Promise<void> {
    await this.ormRepository.remove(storage);
  }

  public async getById(id: string): Promise<IStorage | undefined> {
    const storage = await this.ormRepository.findOne(id);

    return storage;
  }

  public async getAllBySupplier(supplier: string): Promise<IStorage[]> {
    const products = await this.ormRepository.find({
      where: {
        supplierId: { $eq: supplier },
      },
    });

    return products;
  }

  public async getAllBySender(sender: string): Promise<IStorage[]> {
    const products = await this.ormRepository.find({
      where: {
        senderId: { $eq: sender },
      },
    });

    return products;
  }
}
