import { IDeleteProductRequest } from "../models/requests/IDeleteProductRequest";
import { IProductResponse } from "../models/responses/IProductResponse";

export interface IDeleteProductUseCase {
  execute: (data: IDeleteProductRequest) => Promise<void>
}
