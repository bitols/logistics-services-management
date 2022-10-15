import { injectable, inject } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IGetAllProductsBySender } from '../domain/models/requests/IGetAllProductsBySender';
import { IProducts } from '../domain/models/responses/IProducts';

@injectable()
export default class GetAllProductsBySenderUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    request: IGetAllProductsBySender,
  ): Promise<IProducts[] | undefined> {
    const products = await this.productsRepository.getAllBySender(request);
    return products;
  }
}
