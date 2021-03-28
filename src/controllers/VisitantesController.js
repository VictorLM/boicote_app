const {
  Boicote, Comentario, Voto, Autor,
} = require('../models');

class VisitantesController {
  //
  async autores(req, res) {
    try {
      const autores = await Autor.findAll({
        where: { visitanteId: req.cookies.visitante },
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
        order: [['createdAt', 'DESC']],
      });

      if (!autores) {
        return res.status(400).json('Visitante ainda não é autor.');
      }

      return res.status(200).json(autores);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async boicotes(req, res) {
    try {
      const autor = await Autor.findOne({
        where: { visitanteId: req.cookies.visitante },
      });

      if (!autor) {
        return res.status(400).json('Visitante ainda não é autor.');
      }

      const boicotes = await Boicote.findAll({
        where: { autorId: autor.id },
        attributes: {
          exclude: ['updatedAt', 'deletedAt', 'token'],
        },
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json(boicotes);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async comentarios(req, res) {
    try {
      const autor = await Autor.findOne({
        where: { visitanteId: req.cookies.visitante },
      });

      if (!autor) {
        return res.status(400).json('Visitante ainda não é autor.');
      }

      const comentarios = await Comentario.findAll({
        where: { autorId: autor.id },
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json(comentarios);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async votos(req, res) {
    try {
      const votos = await Voto.findAll({
        where: { visitanteId: req.cookies.visitante },
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json(votos);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }
  //
}

module.exports = new VisitantesController();
