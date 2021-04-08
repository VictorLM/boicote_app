const { Voto, Boicote } = require('../models');

class VotosController {
  //
  async index(req, res) {
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

  async store(req, res) {
    // TODO - DEPLOY OPÇÕES DE DESVOTAR
    try {
      const { visitanteId } = req.cookies;

      if (!visitanteId) {
        return res.status(400).json([{
          message: 'ID do visitante não encontrado. Recarregar a página pode resolver o problema.',
        }]);
      }

      const { boicoteId } = req.params;
      const { cima } = req.body;

      if (!boicoteId || !('cima' in req.body)) {
        return res.status(400).json([{
          message: 'Informe o ID do Boicote e o tipo de Voto.',
        }]);
      }

      // CHECAR SE JÁ NÃO VOTOU
      const jaVotou = await Voto.findOne({
        where: {
          visitanteId,
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
        return res.status(400).json([{
          message: 'Boicote não existe.',
        }]);
      }

      const voto = await Voto.create({
        boicoteId,
        visitanteId,
        cima,
      });

      return res.json(voto);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  //
}

module.exports = new VotosController();
