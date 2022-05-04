import { IProduct } from '@modules/products/domain/models/entities/IProduct';
import { ICreateProductsRequest } from '@modules/products/domain/models/requests/ICreateProductsRequest';
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

  public async getAllByClient(client: string): Promise<IProduct[]> {
    const products = await this.ormRepository.find({
      where: {
        clientId: { $eq: client },
      },
    });

    return products;
  }

  public async getAllByDepot(depot: string): Promise<IProduct[]> {
    const products = await this.ormRepository.find({
      where: {
        depotId: { $eq: depot },
      },
    });

    return products;
  }
}