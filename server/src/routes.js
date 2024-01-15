import { Router } from "express";

import auth from "./middlewares/auth";

import SessionsController from "./controllers/SessionsController";
import UsersController from "./controllers/UsersController";
import CardapioController from "./controllers/CardapioController";

const routes = new Router();

routes.post('/sessions', SessionsController.create);

// routes.use(auth)

//RESTFull
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

routes.get('/cardapio', CardapioController.index);
routes.get('/cardapio/:id', CardapioController.show);
routes.post('/cardapio/', CardapioController.create);
routes.put('/cardapio/:id', CardapioController.update);
routes.delete('/cardapio/:id', CardapioController.destroy);

export default routes;