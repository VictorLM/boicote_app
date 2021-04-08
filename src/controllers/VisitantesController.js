const {
  Boicote, Comentario, Voto, Autor, IP, Visitante,
} = require('../models');

class VisitantesController {
  //
  async novoVisitante(req, res) {
    // TODO - CHECAR SPAM PELO IP E BLOQUEAR
    try {
      const novoIp = await IP.upsert(req.ip);

      const novoVisitante = await Visitante.create({
        IpId: novoIp.id,
        agente: req.headers['user-agent'] ? req.headers['user-agent'].substr(0, 254) : null,
      });

      return res.status(200).json(novoVisitante.id);
    } catch (e) {
      return res.status(500).json(e.errors);
    }
    //
  }

  async autores(req, res) {
    try {
      const { visitanteId } = req.cookies;

      if (!visitanteId) {
        return res.status(400).json([{
          message: 'ID do visitante não encontrado. Recarregar a página pode resolver o problema.',
        }]);
      }

      const autores = await Autor.findAll({
        where: { visitanteId },
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
        order: [['createdAt', 'DESC']],
      });

      if (!autores) {
        return res.status(400).json([{
          message: 'Visitante ainda não é autor.',
        }]);
      }

      return res.status(200).json(autores);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async boicotes(req, res) {
    try {
      const { visitanteId } = req.cookies;

      if (!visitanteId) {
        return res.status(400).json([{
          message: 'ID do visitante não encontrado. Recarregar a página pode resolver o problema.',
        }]);
      }

      const autor = await Autor.findOne({
        where: { visitanteId },
      });

      if (!autor) {
        return res.status(400).json([{
          message: 'Visitante ainda não é autor.',
        }]);
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
      const { visitanteId } = req.cookies;

      if (!visitanteId) {
        return res.status(400).json([{
          message: 'ID do visitante não encontrado. Recarregar a página pode resolver o problema.',
        }]);
      }

      const autor = await Autor.findOne({
        where: { visitanteId },
      });

      if (!autor) {
        return res.status(400).json([{
          message: 'Visitante ainda não é autor.',
        }]);
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
      const { visitanteId } = req.cookies;

      if (!visitanteId) {
        return res.status(400).json([{
          message: 'ID do visitante não encontrado. Recarregar a página pode resolver o problema.',
        }]);
      }

      const votos = await Voto.findAll({
        where: { visitanteId },
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
