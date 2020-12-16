const { Op, literal } = require('sequelize');
const { Boicote, Autor, Link } = require('../models');

class BoicotesController {
  //
  async index(req, res) {
    // TODO - MANDAR TODOS OS VOTOS DO VISITANTE
    try {
      const boicotes = await Boicote.findAll({
        where: {
          confirmado: { [Op.ne]: null },
          aprovado: { [Op.ne]: null },
        },
        include: [{
          model: Autor,
          as: 'autor',
          attributes: ['nome'],
        },
        {
          model: Link,
          as: 'links',
          attributes: ['link', 'confiavel'],
        }],
        attributes: {
          include: [
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = boicote.id AND votos.cima = true)'), 'cimaVotos'],
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = boicote.id AND votos.cima = false)'), 'baixoVotos'],
          ],
          exclude: ['autorId', 'updatedAt', 'deletedAt'],
        },
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json(boicotes);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async store(req, res) {
    // TODO - CATCH ERRORS
    try {
      // MOSTRAR BOICOTES COM TÍTULOS SIMILARES - TODO - VER SE DA ERRO TITULO UNIQUE E PARANOID
      // AUTOR
      const autor = await Autor.create({
        nome: req.body.nome,
        email: req.body.email,
        visitanteId: req.cookies.visitante,
      });
      // BOICOTE
      const boicote = await Boicote.create({
        autorId: autor.id,
        marca: req.body.marca,
        titulo: req.body.titulo,
        texto: req.body.texto,
        tags: req.body.tags,
      });
      // LINKS
      Object.values(req.body.links).forEach(async (link) => {
        await Link.create({ link, boicoteId: boicote.id });
      });
      return res.json(boicote);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async delete(req, res) { // TODO - CONFIRMAR EXCLUSÃO POR E-MAIL
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Informe o ID'],
        });
      }

      const boicote = await Boicote.findByPk(id);

      if (!boicote) {
        return res.status(400).json({
          errors: ['Texto não existe'],
        });
      }

      await boicote.destroy();
      return res.json({
        deleted: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  //
}

module.exports = new BoicotesController();
