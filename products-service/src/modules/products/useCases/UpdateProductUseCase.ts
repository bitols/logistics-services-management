import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUpdateProductRequest } from "../domain/models/requests/IUpdateProductRequest";
import { IProductResponse } from "../domain/models/responses/IProductResponse";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IUpdateProductUseCase } from "../domain/useCases/IUpdateProductUseCase";

@injectable()
export default class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
  ) {}

  public async execute(data: IUpdateProductRequest): Promise<IProductResponse> {
    const product = await this.productsRepository.getById(data.id);

    if (!product) {
      throw new AppError('Product not found');
    }

    product.name = data.name;
    product.price = data.price;
    product.height = data.height;
    product.lenght = data.lenght;
    product.width = data.width;
    product.price = data.price;
    product.depotId = data.depotId;

    await this.productsRepository.save(product);

    return {
      id: product.id,
      name: product.name,
      height: product.height,
      width: product.width,
      lenght: product.lenght,
      price: product.price,
      depotId: product.depotId
    };
  }

}
