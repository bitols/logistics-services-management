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
  public async getAllByName(sender: string, name: string): Promise<IProduct[]> {
    const products = await this.ormRepository.findBy({
      senderId: sender,
      name: new RegExp(`^${name}`) as unknown as string,
    });

    return products;
  }
  public async getByName(
    sender: string,
    name: string,
  ): Promise<IProduct | null | undefined> {
    const product = await this.ormRepository.findOneBy({
      senderId: sender,
      name: name,
    });

    return product;
  }

  public async create(data: ICreateProducts): Promise<IProduct> {
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

  public async getById(id: string): Promise<IProduct | null | undefined> {
    const product = await this.ormRepository.findOneById(id);

    return product;
  }

  public async getAllBySender(sender: string): Promise<IProduct[]> {
    const products = await this.ormRepository.findBy({
      senderId: sender,
    });

    return products;
  }
}
