import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import GymHelpOrderController from './app/controllers/GymHelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';

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
routes.get('/students', StudentController.index);
routes.put('/students/:id', StudentController.update);

//plans
routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

//registrations
routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.get('/registrations/:id', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

//students checkins
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

//gym help orders
routes.get('/help-orders', GymHelpOrderController.index);
routes.patch('/help-orders/:id/answer', GymHelpOrderController.update);

//students help-orders
routes.post('/students/:id/help-orders', StudentHelpOrderController.store);
routes.get('/students/:id/help-orders', StudentHelpOrderController.index);

export default routes;
