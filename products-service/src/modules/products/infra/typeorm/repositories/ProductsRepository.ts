import { IProduct } from '@shared-types/products/domain/models/entities/IProduct';
import { ICreateProductsRequest } from '@shared-types/products/domain/models/requests/ICreateProductsRequest';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { getRepository, Repository } from 'typeorm';
import Product from '../entities/Product';

export class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(data: ICreateProductsRequest): Promise<IProduct> {
    const product = this.ormRepository.create(data);

    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async getById(id: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async getAllBySender(sender: string): Promise<IProduct[]> {
    const products = await this.ormRepository.find({
      where: {
        senderId: { $eq: sender },
      },
    });

    return products;
  }

  public async getAllByStorage(storage: string): Promise<IProduct[]> {
    const products = await this.ormRepository.find({
      where: {
        storageId: { $eq: storage },
      },
    });

    return products;
  }
}
