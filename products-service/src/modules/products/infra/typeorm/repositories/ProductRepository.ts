import { IProduct } from "@modules/products/domain/models/entities/IProduct";
import { ICreateProductRequest } from "@modules/products/domain/models/requests/ICreateProductRequest";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { getRepository, Repository } from "typeorm";
import Product from "../entities/Product";

export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>
  constructor (  ) {
    this.ormRepository = getRepository(Product);
  }

  public async create(data: ICreateProductRequest): Promise<IProduct> {
    const product = this.ormRepository.create(data);

    return product

  }
  public async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);

    return product;
  }
  public async remove(product: IProduct): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async getById(id: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }
  public async getAllByClient(clientId: string): Promise<IProduct[]> {
    const products = await this.ormRepository.find({
      where: {
        clientId,
      },
    });

    return products;
  }
  public async getAllByDepot(depotId: string): Promise<IProduct[]> {
    const products = await this.ormRepository.find({
      where: {
        depotId,
      },
    });

    return products;
  }
}
