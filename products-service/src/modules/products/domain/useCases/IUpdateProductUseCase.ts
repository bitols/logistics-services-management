import { IUpdateProductRequest } from "../models/requests/IUpdateProductRequest";
import { IProductResponse } from "../models/responses/IProductResponse";

export interface IUpdateProductUseCase {
  execute: (data: IUpdateProductRequest) => Promise<IProductResponse>
}
