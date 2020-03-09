import { Router } from 'express';

import DonorsController from './app/controllers/DonorsController';

const routes = new Router();

routes.get('/', DonorsController.index);

export default routes;
