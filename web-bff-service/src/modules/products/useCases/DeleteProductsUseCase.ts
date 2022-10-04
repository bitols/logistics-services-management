import { inject, injectable } from 'tsyringe';
import { IDeleteProducts } from '../domain/models/requests/IDeleteProducts';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
export default class DeleteProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(data: IDeleteProducts): Promise<void> {
    await this.productsRepository.delete(data);
  }
}
