import { Router } from 'express';
import StoragesController from '../contollers/StoragesController';
import { celebrate, Joi, Segments } from 'celebrate';

const storagesRouter = Router();
const storagesController = new StoragesController();

storagesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      capacity: Joi.number().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      supplierId: Joi.string().hex().required(),
      senderId: Joi.string().hex().required(),
    },
  }),
  storagesController.create,
);
storagesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.delete,
);

storagesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.getById,
);

storagesRouter.get(
  '/:id/products',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.getStoredProducts,
);

storagesRouter.post(
  '/:id/products',
  celebrate({
    [Segments.BODY]: {
      productId: Joi.string().hex().required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.addStoredProducts,
);

storagesRouter.delete(
  '/:id/products/:productId',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
      productId: Joi.string().hex().required(),
    },
  }),
  storagesController.removeStoredProducts,
);

export default storagesRouter;
