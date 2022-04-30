import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { IGetAllProductByDepotIdRequest } from "../domain/models/requests/IGetAllProductByDepotIdRequest";
import { IProductResponse } from "../domain/models/responses/IProductResponse";
import { IProductRepository } from "../domain/repositories/IProductRepository";
import { IGetAllProductsByDepotIdUseCase } from "../domain/useCases/IGetAllProductsByDepotIdUseCase";

@injectable()
export default class GetAllProductsByDepotIdUseCase implements IGetAllProductsByDepotIdUseCase {

  constructor(
    @inject('ProductRepository')
    private productsRepository: IProductRepository,
    ) {}

  public async execute(data: IGetAllProductByDepotIdRequest): Promise<IProductResponse[]> {
    const products = await this.productsRepository.getAllByDepot(data.depotId);


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
