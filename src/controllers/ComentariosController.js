const { Boicote, Comentario, Autor } = require('../models');

class ComentariosController {
  //
  async show(req, res) {
    try {
      const { boicoteId } = req.params;

      if (!boicoteId) {
        return res.status(400).json({
          errors: ['Informe o ID do Boicote.'],
        });
      }
      const boicote = await Boicote.findByPk(boicoteId);

      if (!boicote) {
        return res.status(400).json({
          errors: ['Boicote não existe'],
        });
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
    // TODO - CATCH ERRORS
    try {
      const { boicoteId } = req.params;
      const { nome, email, comentario } = req.body;

      if (!boicoteId) {
        return res.status(400).json({
          errors: ['Informe o ID do Boicote.'],
        });
      }
      if (!nome || !email) {
        return res.status(400).json({
          errors: ['Favor preencher os campos Nome e E-mail.'],
        });
      }

      const boicote = await Boicote.findByPk(boicoteId);
      if (!boicote) {
        return res.status(400).json({
          errors: ['Boicote não existe.'],
        });
      }

      const autor = await Autor.encontreOuCrie(nome, email, req.cookies.visitante);

      const novoComentario = await Comentario.create({
        comentario: comentario.replace(/(<([^>]+)>)/gi, ''),
        boicoteId,
        autorId: autor.id,
      });

      return res.json(novoComentario);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }
  //
}

module.exports = new ComentariosController();
