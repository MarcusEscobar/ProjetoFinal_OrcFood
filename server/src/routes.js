import { Router } from "express";

import HelloController from "./controllers/HelloController";
import UsersController from "./controllers/UsersController";
import CardapioController from "./controllers/CardapioController";

const routes = new Router();

routes.get('/hello', HelloController.index);

//RESTFull
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.create);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

routes.get('/cardapio', CardapioController.index);
routes.get('/cardapio/:id', CardapioController.show);
routes.post('/cardapio/:user_id', CardapioController.create);
routes.put('/cardapio/:user_id/:id', CardapioController.update);
routes.delete('/cardapio/:user_id/:id', CardapioController.destroy);

export default routes;