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

storagesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      supplierId: Joi.string().required(),
    },
  }),
  storagesController.create,
);

storagesRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
      supplierId: Joi.string().required(),
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

export default storagesRouter;
