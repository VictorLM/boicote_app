const { Op, literal } = require('sequelize');
const {
  Boicote, Autor, Link, Comentario,
} = require('../models');

class BoicotesController {
  //
  async index(req, res) {
    // TODO - PAGINATE
    // TODO - SORTBY VOTOS? VAI TER OPÇÃO DE ORDENAR?
    try {
      const boicotes = await Boicote.findAll({
        // limit: 2, PAGINATE
        // offset: 1, PAGINATE
        where: {
          confirmado: { [Op.ne]: null },
          aprovado: { [Op.ne]: null },
        },
        include: [{
          model: Autor,
          as: 'autor',
          attributes: ['nome', 'visitanteId'],
        }],
        attributes: {
          include: [
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = boicote.id AND votos.cima = true AND deletedAt IS NULL)'), 'cimaVotos'],
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = boicote.id AND votos.cima = false AND deletedAt IS NULL)'), 'baixoVotos'],
            [literal('(SELECT COUNT(*) FROM comentarios WHERE comentarios.boicoteId = boicote.id AND deletedAt IS NULL)'), 'comentariosCount'],
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
    // TODO - UNIQUE TÍTULO VALIDATION RETORNANDO MUITA INFO
    /*
    TODO ERROR - UnhandledPromiseRejectionWarning:
    Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    */
    // MOSTRAR BOICOTES COM TÍTULOS SIMILARES - TODO - VER SE DA ERRO TITULO UNIQUE E PARANOID
    try {
      const { nome, email, links } = req.body;

      if (!nome || !email || !links) {
        return res.status(400).json({
          errors: ['Favor preencher os campos Nome, E-mail e ao menos um Link.'],
        });
      }

      // VALIDANDO LINKS
      Object.values(links).forEach((link) => { //eslint-disable-line
        if (!Link.isLinkValid(link)) {
          return res.status(400).json({
            errors: [`Link inválido: ${link}`],
          });
        }
      });

      // AUTOR
      const autor = await Autor.encontreOuCrie(nome, email, req.cookies.visitante);
      // BOICOTE
      const boicote = await Boicote.create({
        autorId: autor.id,
        marca: req.body.marca,
        titulo: (req.body.titulo).replace(/(<([^>]+)>)/gi, ''),
        texto: (req.body.texto).replace(/(<([^>]+)>)/gi, ''),
        tags: req.body.tags,
      });
      // LINKS
      Object.values(links).forEach(async (link) => {
        await Link.create({ link, boicoteId: boicote.id });
      });

      return res.json(boicote);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Informe o ID do Boicote.'],
        });
      }
      const boicote = await Boicote.findOne({
        where: {
          id,
          confirmado: { [Op.ne]: null },
          aprovado: { [Op.ne]: null },
        },
        include: [{
          model: Autor,
          as: 'autor',
          attributes: ['nome', 'visitanteId'],
        },
        {
          model: Link,
          as: 'links',
          attributes: ['link', 'confiavel'],
        },
        {
          model: Comentario,
          as: 'comentarios',
          attributes: ['comentario'],
          include: {
            model: Autor,
            // as: 'autor,',
            attributes: ['nome', 'visitanteId'],
          },
        }],
        attributes: {
          include: [
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = boicote.id AND votos.cima = true AND deletedAt IS NULL)'), 'cimaVotos'],
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = boicote.id AND votos.cima = false AND deletedAt IS NULL)'), 'baixoVotos'],
          ],
          exclude: ['autorId', 'updatedAt', 'deletedAt'],
        },
        order: [['comentarios', 'createdAt', 'ASC']],
      });
      return res.status(200).json(boicote);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  /*
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
  */
  //
}

module.exports = new BoicotesController();
