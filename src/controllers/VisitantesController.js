const {
  Boicote, Comentario, Voto, Autor,
} = require('../models');

class VisitantesController {
  //
  async boicotes(req, res) {
    try {
      const autor = await Autor.findOne({
        where: { visitanteId: req.cookies.visitante },
      });

      if (!autor) {
        return res.status(200).json('Visitante ainda não tem nada cadastrado.');
      }

      const boicotes = await Boicote.findAll({
        where: { autorId: autor.visitanteId },
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
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
        return res.status(200).json('Visitante ainda não tem nada cadastrado.');
      }

      const comentarios = await Comentario.findAll({
        where: { autorId: autor.visitanteId },
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
      const autor = await Autor.findOne({
        where: { visitanteId: req.cookies.visitante },
      });

      if (!autor) {
        return res.status(200).json('Visitante ainda não tem nada cadastrado.');
      }

      const votos = await Voto.findAll({
        where: { autorId: autor.visitanteId },
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
