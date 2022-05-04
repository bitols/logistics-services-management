import CreateProductsUseCase from '@modules/products/useCases/CreateProductsUseCase';
import DeleteProductsUseCase from '@modules/products/useCases/DeleteProductsUseCase';
import GetAllProductsByClientIdUseCase from '@modules/products/useCases/GetAllProductsByClientIdUseCase';
import GetAllProductsByDepotIdUseCase from '@modules/products/useCases/GetAllProductsByDepotIdUseCase';
import GetProductsUseCase from '@modules/products/useCases/GetProductsUseCase';
import UpdateProductsUseCase from '@modules/products/useCases/UpdateProductsUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
export default class ProductsController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getProduct = container.resolve(GetProductsUseCase);
    const product = await getProduct.execute({ id });

    return response.json(product);
  }

  public async getAllByDepotId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getAllProductsByDepot = container.resolve(
      GetAllProductsByDepotIdUseCase,
    );
    const products = await getAllProductsByDepot.execute({ depotId: id });

    return response.json(products);
  }

  public async getAllByClientId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const getAllProductsByClient = container.resolve(
      GetAllProductsByClientIdUseCase,
    );
    const products = await getAllProductsByClient.execute({ clientId: id });

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, height, width, lenght, price, clientId, depotId } =
      request.body;

    const createProduct = container.resolve(CreateProductsUseCase);
    const product = await createProduct.execute({
      name,
      height,
      width,
      lenght,
      price,
      clientId,
      depotId,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, height, width, lenght, price, depotId } = request.body;

    const updateProduct = container.resolve(UpdateProductsUseCase);
    const product = await updateProduct.execute({
      id,
      name,
      height,
      width,
      lenght,
      price,
      depotId,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductsUseCase);
    await deleteProduct.execute({ id });

    return response.json({});
  }
}