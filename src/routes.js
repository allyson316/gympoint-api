import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';
import validateUserStore from './app/validations/UserStore';
import validateUserUpdate from './app/validations/UserUpdate';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// users
routes.post('/users', validateUserStore, UserController.store);
routes.put('/users', validateUserUpdate, UserController.update);

// students
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

export default routes;
