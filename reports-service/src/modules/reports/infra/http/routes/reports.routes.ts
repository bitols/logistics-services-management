import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import ReportsController from '../controllers/ReportsController';

const reportsRouter = Router();
const reportsController = new ReportsController();

reportsRouter.get(
  '/:senderId/storages-capacity',
  celebrate({
    [Segments.PARAMS]: {
      senderId: Joi.string().hex().required(),
    },
  }),
  reportsController.getSendersStoragesCapacity,
);

reportsRouter.post(
  '/storages-capacity',
  celebrate({
    [Segments.BODY]: {
      storageId: Joi.string().hex().required(),
      capacity: Joi.number().required(),
      stored: Joi.number().required(),
      usage: Joi.number().required(),
      products: Joi.number().required(),
      value: Joi.number().required(),
      senderId: Joi.string().hex().required(),
    },
  }),
  reportsController.RegisterSendersStoragesCapacity,
);

export default reportsRouter;
