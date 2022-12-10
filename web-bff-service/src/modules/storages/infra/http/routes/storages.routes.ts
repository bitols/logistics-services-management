import { Router } from 'express';
import StoragesController from '../contollers/StoragesController';
import { celebrate, Joi, Segments } from 'celebrate';
import { loggingRequest } from '@shared/infra/middlewares/loggingRequest';

const storagesRouter = Router();
const storagesController = new StoragesController();

storagesRouter.post(
  '/',
  loggingRequest,
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
  loggingRequest,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.delete,
);

storagesRouter.get(
  '/:id',
  loggingRequest,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.getById,
);

storagesRouter.get(
  '/:id/products',
  loggingRequest,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.getStoredProducts,
);

storagesRouter.get(
  '/:id/reports',
  loggingRequest,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.getStoragesReport,
);

storagesRouter.post(
  '/:id/products',
  loggingRequest,
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
  loggingRequest,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
      productId: Joi.string().hex().required(),
    },
  }),
  storagesController.removeStoredProducts,
);

export default storagesRouter;
