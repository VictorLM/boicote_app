const { Voto, Boicote } = require('../models');

class VotosController {
  //
  async index(req, res) {
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

  async store(req, res) {
    // TODO - CATCH ERRORS
    // TODO - DEPLOY OPÇÕES DE DESVOTAR CIMA E BAIXOVOTOS
    try {
      const { boicoteId, cima } = req.body;

      if (!boicoteId || !('cima' in req.body)) {
        return res.status(400).json({
          errors: ['Informe o ID do Boicote e o tipo de Voto'],
        });
      }

      // CHECAR SE JÁ NÃO VOTOU
      const jaVotou = await Voto.findOne({
        where: {
          visitanteId: req.cookies.visitante,
          boicoteId,
        },
      });

      if (jaVotou) {
        if (jaVotou.cima !== cima) {
          jaVotou.cima = cima;
          jaVotou.save();
        }
        return res.json(jaVotou);
      }

      const boicote = await Boicote.findByPk(boicoteId);

      if (!boicote) {
        return res.status(400).json({
          errors: ['Boicote não existe'],
        });
      }

      const voto = await Voto.create({
        boicoteId,
        visitanteId: req.cookies.visitante,
        cima,
      });

      // TODO - RETORNAR VOTO PARA O FRONT MARCAR
      // TODO - RETORNAR SÓ CAMPOS QUE SERÃO USADOS
      return res.json(voto);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  //
}

module.exports = new VotosController();
