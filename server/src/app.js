// const express = require('express')
// const cors = require('cors');
// const app = express()
// const port = 3000

import express from "express";
import cors from "cors"

import routes from "./routes";
import "./database";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}



// app.get('/', (req, res) => {
//   return res.json({message: "Olá Mundo, essa mensagem vem do backend"})
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

export default new App().server;