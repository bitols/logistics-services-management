import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IGetAllProductByClientIdRequest } from "../domain/models/requests/IGetAllProductByClientIdRequest";
import { IProductResponse } from "../domain/models/responses/IProductResponse";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IGetAllProductsByClientIdUseCase } from "../domain/useCases/IGetAllProductsByClientIdUseCase";

@injectable()
export default class GetAllProductsByClientIdUseCase implements IGetAllProductsByClientIdUseCase {

  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
    ) {}

  public async execute(data: IGetAllProductByClientIdRequest): Promise<IProductResponse[]> {
    const products = await this.productsRepository.getAllByClient(data.clientId);


    if (!products) {
      throw new AppError('Product not found');
    }

    return products.map( product => ({
      id: product.id,
      name: product.name,
      height: product.height,
      width: product.width,
      lenght: product.lenght,
      price: product.price,
      depotId: product.depotId
    }));

  }

}
