import { Router } from 'express';
import SendersController from '../controllers/SendersController';
import { celebrate, Joi, Segments } from 'celebrate';

const sendersRouter = Router();
const sendersController = new SendersController();

sendersRouter.get('/', sendersController.getAll);

export default sendersRouter;
