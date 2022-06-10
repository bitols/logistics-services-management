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
    console.log(`create product: ${JSON.stringify(data)}`);

    const product = this.ormRepository.create(data);

    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    console.log(`save product: ${JSON.stringify(product)}`);

    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: IProduct): Promise<void> {
    console.log(`remove product: ${JSON.stringify(product)}`);

    await this.ormRepository.remove(product);
  }

  public async getById(id: string): Promise<IProduct | undefined> {
    console.log(`get product by id: ${id}`);

    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async getAllBySender(sender: string): Promise<IProduct[]> {
    console.log(`get all products by sender id: ${sender}`);

    const products = await this.ormRepository.find({
      where: {
        senderId: { $eq: sender },
      },
    });

    return products;
  }

  public async getAllByStorage(storage: string): Promise<IProduct[]> {
    console.log(`get all products by storage id: ${storage}`);
    const products = await this.ormRepository.find({
      where: {
        storageId: { $eq: storage },
      },
    });

    return products;
  }
}
