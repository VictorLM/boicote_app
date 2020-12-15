const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { checkVisitanteMiddleware } = require('./middlewares/visitante.js');

const corsOptions = require('./config/cors'); // TODO - FECHAR PARA DOMINIO APP
// Routes
const boicotesRoutes = require('./routes/boicotesRoutes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    // this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(checkVisitanteMiddleware);
    // this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    // Boicotes
    this.app.use('/boicotes/', boicotesRoutes);
  }
}

module.exports = new App().app;

// TODO - LOG ERRORS DB
