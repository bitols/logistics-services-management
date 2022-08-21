import { Router } from 'express';
import StoragesController from '../contollers/StoragesController';
import { celebrate, Joi, Segments } from 'celebrate';

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
  '/:id/products',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  storagesController.getProducts,
);

export default storagesRouter;
