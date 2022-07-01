import { ISuppliersRepository } from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import { Repository } from 'typeorm';
import Supplier from '../entities/Supplier';
import { dataSource } from '@shared/infra/orm';
import { ICreateSuppliers } from '@modules/suppliers/domain/models/requests/ICreateSuppliers';
import { ISupplier } from '@modules/suppliers/domain/models/entities/ISupplier';

export class SuppliersRepository implements ISuppliersRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = dataSource.getMongoRepository(Supplier);
  }

  public async create(data: ICreateSuppliers): Promise<ISupplier> {
    const supplier = this.ormRepository.create(data);

    return supplier;
  }

  public async save(supplier: ISupplier): Promise<ISupplier> {
    await this.ormRepository.save(supplier);

    return supplier;
  }

  public async remove(supplier: ISupplier): Promise<void> {
    await this.ormRepository.remove(supplier);
  }

  public async getById(id: string): Promise<ISupplier | null | undefined> {
    const supplier = await this.ormRepository.findOneById(id);
    return supplier;
  }

  public async getAll(): Promise<ISupplier[]> {
    const suppliers = await this.ormRepository.find();

    return suppliers;
  }
}
