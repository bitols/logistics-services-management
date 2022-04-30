import { IGetAllProductByDepotIdRequest } from "../models/requests/IGetAllProductByDepotIdRequest";
import { IProductResponse } from "../models/responses/IProductResponse";

export interface IGetAllProductsByDepotIdUseCase {
  execute(data: IGetAllProductByDepotIdRequest): Promise<IProductResponse[]>
}
