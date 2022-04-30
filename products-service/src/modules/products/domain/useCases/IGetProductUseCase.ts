import { IGetProductRequest } from "../models/requests/IGetProductRequest";
import { IProductResponse } from "../models/responses/IProductResponse";

export interface IGetProductUseCase {
  execute(data: IGetProductRequest): Promise<IProductResponse>
}
