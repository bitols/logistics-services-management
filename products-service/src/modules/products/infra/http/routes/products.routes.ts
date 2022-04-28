import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get(
  '/:id',
  productsController.getById,
);

productsRouter.get(
  '/depot/:id',
  productsController.getAllByDepotId,
);

productsRouter.get(
  '/client/:id',
  productsController.getAllByClientId,
);

productsRouter.post(
  '/',
  productsController.create,
);

productsRouter.put(
  '/:id',
  productsController.update,
);

productsRouter.delete(
  '/:id',
  productsController.delete,
);

export default productsRouter;
