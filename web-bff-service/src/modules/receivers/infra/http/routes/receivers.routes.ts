import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ReceiversController from '../controllers/ReceiversController';

const receiversRouter = Router();
const receiversController = new ReceiversController();

receiversRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().hex().required(),
    },
  }),
  receiversController.getById,
);

export default receiversRouter;
