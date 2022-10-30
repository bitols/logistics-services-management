import { Router } from 'express';
import SuppliersController from '../controllers/SuppliersController';
import { celebrate, Joi, Segments } from 'celebrate';
import { loggingRequest } from '../../middlewares/loggingRequest';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();

suppliersRouter.get('/', loggingRequest, suppliersController.getAll);

suppliersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  suppliersController.getById,
);

suppliersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    },
  }),
  suppliersController.create,
);

suppliersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  suppliersController.update,
);

suppliersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  suppliersController.delete,
);

export default suppliersRouter;
