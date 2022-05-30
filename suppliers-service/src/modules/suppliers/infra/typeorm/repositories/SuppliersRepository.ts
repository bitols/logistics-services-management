import { ISupplier } from '@shared-types/suppliers/domain/models/entities/ISupplier';
import { ICreateSuppliersRequest } from '@shared-types/suppliers/domain/models/requests/ICreateSuppliersRequest';
import { ISuppliersRepository } from '@modules/suppliers/domain/repositories/ISuppliersRepository';
import { getRepository, Repository } from 'typeorm';
import Supplier from '../entities/Supplier';

export class SuppliersRepository implements ISuppliersRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = getRepository(Supplier);
  }

  public async create(data: ICreateSuppliersRequest): Promise<ISupplier> {
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

  public async getById(id: string): Promise<ISupplier | undefined> {
    const supplier = await this.ormRepository.findOne(id);

    return supplier;
  }

  public async getAll(): Promise<ISupplier[]> {
    const suppliers = await this.ormRepository.find();

    return suppliers;
  }
}
