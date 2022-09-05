import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import StoragesController from '../controllers/StoragesController';

const storagesRouter = Router();
const storagesController = new StoragesController();

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
  '/suppliers/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.getAllBySupplierId,
);

storagesRouter.get(
  '/senders/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.getAllBySenderId,
);

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

storagesRouter.patch(
  '/:id/location',
  celebrate({
    [Segments.BODY]: {
      location: Joi.object().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.updateLocation,
);

storagesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      capacity: Joi.number().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.update,
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
  '/:id/products',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.getStoredProducts,
);

storagesRouter.post(
  '/products',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      height: Joi.number().precision(5).required(),
      width: Joi.number().precision(5).required(),
      lenght: Joi.number().precision(5).required(),
      value: Joi.number().precision(2).required(),
      productId: Joi.string().hex().required(),
      storageId: Joi.string().hex().required(),
    },
  }),
  storagesController.addStoreProduct,
);

storagesRouter.delete(
  '/products/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.removeStoreProduct,
);

export default storagesRouter;
