import { ICreateProductRequest } from "../models/requests/ICreateProductRequest";
import { IProductResponse } from "../models/responses/IProductResponse";

export interface ICreateProductUseCase {
  execute: (data: ICreateProductRequest) => Promise<IProductResponse>
}
