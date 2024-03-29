const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
// const { checkVisitanteMiddleware } = require('./middlewares/visitante.js');

const corsOptions = require('./config/cors');
// Routes
const boicotesRoutes = require('./routes/boicotesRoutes');
const votosRoutes = require('./routes/votosRoutes');
const comentariosRoutes = require('./routes/comentariosRoutes');
const visitantesRoutes = require('./routes/visitantesRoutes');
const denunciasRoutes = require('./routes/denunciasRoutes');
const twitterApiRoutes = require('./routes/twitterApiRoutes');

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser());
    // this.app.use(checkVisitanteMiddleware); DESATIVADO. FRONT REACT. CRIADA ROTA P/ ISSO
    // this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    // Boicotes
    this.app.use('/boicotes/', boicotesRoutes);
    // Votos
    this.app.use('/votos/', votosRoutes);
    // Comentários
    this.app.use('/comentarios/', comentariosRoutes);
    // Visitantes
    this.app.use('/visitantes/', visitantesRoutes);
    // Denuncias
    this.app.use('/denuncias/', denunciasRoutes);
    // Twitter API
    this.app.use('/tweets/', twitterApiRoutes);
  }
}

module.exports = new App().app;
