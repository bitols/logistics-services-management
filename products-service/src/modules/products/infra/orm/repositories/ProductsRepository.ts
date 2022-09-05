import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import Product from '../entities/Product';
import { dataSource } from '@config/orm';
import { ICreateProducts } from '@modules/products/domain/models/requests/ICreateProducts';
import { IProduct } from '@modules/products/domain/models/entities/IProduct';
export class ProductsRepository implements IProductsRepository {
  private ormRepository;
  constructor() {
    this.ormRepository = dataSource.getRepository(Product);
  }
  public async getByName(
    sender: string,
    name: string,
  ): Promise<IProduct | null | undefined> {
    console.log(`get product by name: ${name}`);

    const product = await this.ormRepository.findOneBy({
      senderId: sender,
      name: name,
    });

    return product;
  }

  public async create(data: ICreateProducts): Promise<IProduct> {
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

  public async getById(id: string): Promise<IProduct | null | undefined> {
    console.log(`get product by id: ${id}`);

    const product = await this.ormRepository.findOneById(id);

    return product;
  }

  public async getAllBySender(sender: string): Promise<IProduct[]> {
    console.log(`get all products by sender id: ${sender}`);

    const products = await this.ormRepository.findBy({
      senderId: sender,
    });

    return products;
  }
}
