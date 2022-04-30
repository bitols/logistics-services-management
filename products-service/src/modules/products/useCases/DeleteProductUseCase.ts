import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteProductRequest } from '../domain/models/requests/IDeleteProductRequest';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IDeleteProductUseCase } from '../domain/useCases/IDeleteProductUseCase';

@injectable()
export default class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
  ) {}
  public async execute(data: IDeleteProductRequest): Promise<void> {
    const product = await this.productsRepository.getById(data.id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await this.productsRepository.remove(product);
  }
}
