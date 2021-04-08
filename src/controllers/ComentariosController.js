const { Boicote, Comentario, Autor } = require('../models');

class ComentariosController {
  //
  async show(req, res) {
    try {
      const { boicoteId } = req.params;

      if (!boicoteId) {
        return res.status(400).json([{
          message: 'Informe o ID do Boicote.',
        }]);
      }
      const boicote = await Boicote.findByPk(boicoteId);

      if (!boicote) {
        return res.status(400).json([{
          message: 'Boicote não existe.',
        }]);
      }

      const comentarios = await Comentario.findAll({
        where: { boicoteId },
        include: {
          model: Autor,
          attributes: ['nome', 'visitanteId'],
        },
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

  async store(req, res) {
    try {
      const { visitanteId } = req.cookies;

      if (!visitanteId) {
        return res.status(400).json([{
          message: 'ID do visitante não encontrado. Recarregar a página pode resolver o problema.',
        }]);
      }

      const { boicoteId } = req.params;
      const { nome, email, comentario } = req.body;

      if (!boicoteId) {
        return res.status(400).json([{
          message: 'Informe o ID do Boicote.',
        }]);
      }

      if (!nome || !email || !comentario) {
        return res.status(400).json([{
          message: 'Favor preencher todos os campos do formulário.',
        }]);
      }

      const boicote = await Boicote.findByPk(boicoteId);

      if (!boicote) {
        return res.status(400).json([{
          message: 'Boicote não existe.',
        }]);
      }

      const autor = await Autor.encontreOuCrie(nome, email, visitanteId);

      const novoComentario = await Comentario.create({
        comentario: comentario.replace(/(<([^>]+)>)/gi, ''),
        boicoteId,
        autorId: autor.id,
      });

      // GAMB VIOLENTA P/ INCLUIR AUTOR PORQUE NÃO ACHEI OUTRO JEITO, NEM NOS DOCS DO SEQUELIZE
      const comentarioComIncludes = await Comentario.findByPk(novoComentario.id, {
        include: {
          model: Autor,
          attributes: ['nome', 'visitanteId'],
        },
        attributes: {
          exclude: ['updatedAt', 'deletedAt'],
        },
      });

      return res.json(comentarioComIncludes);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }
  //
}

module.exports = new ComentariosController();
