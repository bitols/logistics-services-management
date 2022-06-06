import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      height: Joi.number().precision(5).required(),
      width: Joi.number().precision(5).required(),
      lenght: Joi.number().precision(5).required(),
      price: Joi.number().precision(2).required(),
      senderId: Joi.string().hex().required(),
      storageId: Joi.string().hex().required(),
    },
  }),
  productsController.create,
);

export default productsRouter;
