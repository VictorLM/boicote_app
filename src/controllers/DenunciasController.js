const {
  Denuncia, Boicote, Comentario, Autor,
} = require('../models');

class DenunciasController {
  //
  async denunciarBoicote(req, res) {
    try {
      const { visitanteId } = req.cookies;

      if (!visitanteId) {
        return res.status(400).json([{
          message: 'ID do visitante não encontrado. Recarregar a página pode resolver o problema.',
        }]);
      }

      const { boicoteId } = req.params;
      const { nome, email, texto } = req.body;

      if (!boicoteId) {
        return res.status(400).json([{
          message: 'Informe o ID do Boicote.',
        }]);
      }

      if (!nome || !email || !texto) {
        return res.status(400).json([{
          message: 'Por favor, preencha todos os campos do formulário.',
        }]);
      }

      const boicote = await Boicote.findByPk(boicoteId);

      if (!boicote) {
        return res.status(400).json([{
          message: 'Boicote não existe.',
        }]);
      }

      const autor = await Autor.encontreOuCrie(nome, email, visitanteId);

      await Denuncia.create({
        texto,
        boicoteId,
        autorId: autor.id,
      });

      return res.json();
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async denunciarComentario(req, res) {
    try {
      const { visitanteId } = req.cookies;

      if (!visitanteId) {
        return res.status(400).json([{
          message: 'ID do visitante não encontrado. Recarregar a página pode resolver o problema.',
        }]);
      }

      const { comentarioId } = req.params;
      const { nome, email, texto } = req.body;

      if (!comentarioId) {
        return res.status(400).json([{
          message: 'Informe o ID do Comentário.',
        }]);
      }

      if (!nome || !email || !texto) {
        return res.status(400).json([{
          message: 'Por favor, preencha todos os campos do formulário.',
        }]);
      }

      const comentario = await Comentario.findByPk(comentarioId);

      if (!comentario) {
        return res.status(400).json([{
          message: 'Comentário não existe.',
        }]);
      }

      const autor = await Autor.encontreOuCrie(nome, email, visitanteId);

      await Denuncia.create({
        texto,
        comentarioId,
        autorId: autor.id,
      });

      return res.json();
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  //
}

module.exports = new DenunciasController();
