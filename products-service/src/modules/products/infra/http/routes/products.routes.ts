import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  productsController.getById,
);

productsRouter.get(
  '/sender/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  productsController.getAllBySenderId,
);

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
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      height: Joi.number().precision(5).required(),
      width: Joi.number().precision(5).required(),
      lenght: Joi.number().precision(5).required(),
      price: Joi.number().precision(2).required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  productsController.update,
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
