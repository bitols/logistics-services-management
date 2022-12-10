import { IStoragesRepository } from '@modules/storages/domain/repositories/IStoragesRepository';
import Storage from '../entities/Storage';
import { dataSource } from '@config/orm';
import { ICreateStorages } from '@modules/storages/domain/models/requests/ICreateStorages';
import { IStorage } from '@modules/storages/domain/models/entities/IStorage';

export class StoragesRepository implements IStoragesRepository {
  private ormRepository;

  constructor() {
    this.ormRepository = dataSource.getRepository(Storage);
  }

  public async getByName(
    sender: string,
    name: string,
  ): Promise<IStorage | null | undefined> {
    const storage = await this.ormRepository.findOneBy({
      senderId: sender,
      name: name,
    });
    return storage;
  }

  public async getAllByName(sender: string, name: string): Promise<IStorage[]> {
    const storages = await this.ormRepository.findBy({
      senderId: sender,
      name: new RegExp(`^${name}`) as unknown as string,
    });

    return storages;
  }

  public async create(data: ICreateStorages): Promise<IStorage> {
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

  public async getById(id: string): Promise<IStorage | null | undefined> {
    const storage = await this.ormRepository.findOneById(id);

    return storage;
  }

  public async getAllBySupplier(supplier: string): Promise<IStorage[]> {
    const storages = await this.ormRepository.findBy({
      supplierId: supplier,
    });

    return storages;
  }

  public async getAllBySender(sender: string): Promise<IStorage[]> {
    const storages = await this.ormRepository.findBy({
      senderId: sender,
    });

    return storages;
  }
}
