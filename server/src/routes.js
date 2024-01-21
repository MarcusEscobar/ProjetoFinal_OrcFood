import { Router } from "express";

import auth from "./middlewares/auth";

import SessionsController from "./controllers/SessionsController";
import UsersController from "./controllers/UsersController";
import CardapioController from "./controllers/CardapioController";
import PedidoController from "./controllers/PedidoController";

const routes = new Router();

routes.post('/sessions', SessionsController.create);
routes.post('/users', UsersController.create);

routes.use(auth)
//RESTFull
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.put('/users/:id', UsersController.update);
routes.put('/user_economy/:id', UsersController.updateEconomy);
routes.delete('/users/:id', UsersController.destroy);

routes.get('/cardapio', CardapioController.index);
routes.get('/cardapio/:key', CardapioController.index);
routes.get('/cardapio/:id', CardapioController.show);
routes.post('/cardapio/', CardapioController.create);
routes.put('/cardapio', CardapioController.update);
routes.delete('/cardapio/:id', CardapioController.destroy);

routes.get('/pedidos', PedidoController.index)
routes.get('/pedidos_cliente/:id', PedidoController.show);
routes.post('/pedidos', PedidoController.create);
routes.put('/pedidos', PedidoController.update);
routes.delete('/pedidos/:id', PedidoController.destroy);

export default routes;