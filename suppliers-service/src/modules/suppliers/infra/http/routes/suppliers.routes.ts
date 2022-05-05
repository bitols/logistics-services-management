import { Router } from 'express';
import SuppliersController from '../controllers/SuppliersController';
import { celebrate, Joi, Segments } from 'celebrate';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();

suppliersRouter.get('/', suppliersController.getAll);

suppliersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  suppliersController.getById,
);

export default suppliersRouter;
