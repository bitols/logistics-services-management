import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import ReportsController from '../controllers/ReportsController';

const reportsRouter = Router();
const reportsController = new ReportsController();

reportsRouter.get(
  '/storages/:storageId',
  celebrate({
    [Segments.PARAMS]: {
      storageId: Joi.string().hex().required(),
    },
  }),
  reportsController.getStoragesReport,
);

reportsRouter.post(
  '/storages',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().hex().optional(),
      storageId: Joi.string().hex().required(),
      capacity: Joi.number().required(),
      stored: Joi.number().required(),
      usage: Joi.number().required(),
      products: Joi.array().required(),
      value: Joi.number().required(),
      senderId: Joi.string().hex().required(),
      items: Joi.number().required(),
    },
  }),
  reportsController.registerStoragesReport,
);

export default reportsRouter;
