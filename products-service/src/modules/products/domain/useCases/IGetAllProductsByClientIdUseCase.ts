import { IGetAllProductByClientIdRequest } from "../models/requests/IGetAllProductByClientIdRequest";
import { IProductResponse } from "../models/responses/IProductResponse";

export interface IGetAllProductsByClientIdUseCase {
  execute(data: IGetAllProductByClientIdRequest): Promise<IProductResponse[]>
}
