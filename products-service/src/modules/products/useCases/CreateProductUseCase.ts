import { ICreateProductRequest } from "../domain/models/requests/ICreateProductRequest";
import { IProductResponse } from "../domain/models/responses/IProductResponse";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { ICreateProductUseCase } from "../domain/useCases/ICreateProductUseCase";

export default class CreateProductUseCase implements ICreateProductUseCase {

  constructor( private productsRepository: IProductRepository ) {

  }

  public async execute(data: ICreateProductRequest): Promise<IProductResponse> {
    const product = await this.productsRepository.create(data);

    await this.productsRepository.save(product);

    const productResponse: IProductResponse = {
      id: product.id,
      name: product.name,
      height: product.height,
      width: product.width,
      lenght: product.lenght,
      price: product.price
    };

    return productResponse;
  }


}
