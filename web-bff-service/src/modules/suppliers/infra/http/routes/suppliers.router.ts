import { Router } from 'express';
import SuppliersController from '../controllers/SuppliersController';

const suppliersRouter = Router();
const suppliersController = new SuppliersController();

suppliersRouter.get('/', suppliersController.getAll);

export default suppliersRouter;
