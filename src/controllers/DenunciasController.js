const {
  Denuncia, Boicote, Comentario, Autor,
} = require('../models');

class DenunciasController {
  //
  async denunciarBoicote(req, res) {
    // TODO - CATCH ERRORS
    try {
      const { boicoteId } = req.params;
      const { nome, email, texto } = req.body;

      if (!boicoteId) {
        return res.status(400).json({
          errors: ['Informe o ID do Boicote.'],
        });
      }

      if (!nome || !email || !texto) {
        return res.status(400).json({
          errors: ['Por favor, preencha todos os campos do formulário.'],
        });
      }

      const boicote = await Boicote.findByPk(boicoteId);

      if (!boicote) {
        return res.status(400).json({
          errors: ['Boicote não existe'],
        });
      }

      const autor = await Autor.encontreOuCrie(nome, email, req.cookies.visitanteId);

      const denuncia = await Denuncia.create({
        texto,
        boicoteId,
        autorId: autor.id,
      });

      // TODO - RETORNAR SÓ CAMPOS QUE SERÃO USADOS
      return res.json(denuncia);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async denunciarComentario(req, res) {
    // TODO - CATCH ERRORS
    try {
      const { comentarioId } = req.params;
      const { nome, email, texto } = req.body;

      if (!comentarioId) {
        return res.status(400).json({
          errors: ['Informe o ID do Comentário'],
        });
      }

      if (!nome || !email || !texto) {
        return res.status(400).json({
          errors: ['por favor, preencha todos os campos do formulário.'],
        });
      }

      const comentario = await Comentario.findByPk(comentarioId);

      if (!comentario) {
        return res.status(400).json({
          errors: ['Comentário não existe'],
        });
      }

      const autor = await Autor.encontreOuCrie(nome, email, req.cookies.visitanteId);

      const denuncia = await Denuncia.create({
        texto,
        comentarioId,
        autorId: autor.id,
      });

      // TODO - RETORNAR SÓ CAMPOS QUE SERÃO USADOS
      return res.json(denuncia);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e.errors);
    }
  }

  //
}

module.exports = new DenunciasController();
