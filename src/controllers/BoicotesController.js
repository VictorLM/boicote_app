const { Op, literal } = require('sequelize');
const Crypto = require('crypto');
const {
  Boicote, Autor, Link,
} = require('../models');
const nodemailer = require('../config/nodemailer');
const confirmaBoicoteHtmlTemplate = require('../emails/confirmaBoicoteHtmlTemplate');
require('dotenv').config();

class BoicotesController {
  //
  async index(req, res) {
    // TODO - IMPLEMENTAR OPÇÃO DE ORDENAR POR VOTOS, DATA, ETC
    const pagina = req.query.pagina ? Number(req.query.pagina) : 1;
    const limite = 10; // LIMITE POR PÁGINA
    try {
      const boicotes = await Boicote.findAll({
        // PAGINATION
        limit: limite,
        offset: (pagina - 1) * limite,
        //
        where: {
          confirmado: { [Op.ne]: null },
          aprovado: { [Op.ne]: null },
          deletedAt: null,
        },
        include: [{
          model: Autor,
          as: 'autor',
          attributes: ['nome', 'visitanteId'],
        }],
        attributes: {
          include: [
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = Boicote.id AND votos.cima = true AND deletedAt IS NULL)'), 'cimaVotos'],
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = Boicote.id AND votos.cima = false AND deletedAt IS NULL)'), 'baixoVotos'],
            [literal('(SELECT COUNT(*) FROM comentarios WHERE comentarios.boicoteId = Boicote.id AND deletedAt IS NULL)'), 'comentariosCount'],
          ],
          exclude: ['autorId', 'updatedAt', 'deletedAt', 'token'],
        },
        order: [['createdAt', 'DESC']],
      });

      // COUNT PARA O PAGINATION
      const boicotesTotalCount = await Boicote.count({
        where: {
          confirmado: { [Op.ne]: null },
          aprovado: { [Op.ne]: null },
          deletedAt: null,
        },
      });
      return res.status(200).json({ boicotesTotalCount, boicotes });
    } catch (e) {
      // console.log(e);
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

      const { nome, email, links } = req.body;

      if (!nome || !email || !links) {
        return res.status(400).json([{
          message: 'Preencha os campos Nome, E-mail e ao menos um Link.',
        }]);
      }
      // VALIDANDO LINKS - NÃO CONSEGUI USAR O VALIDATOR DO SEQUELIZE
      Object.values(links).forEach((link) => { //eslint-disable-line
        if (!Link.isLinkValid(link)) {
          return res.status(400).json([{
            message: `Link inválido: ${link}`,
          }]);
        }
      });
      // AUTOR
      const autor = await Autor.encontreOuCrie(nome, email, visitanteId);
      // BOICOTE
      const boicote = await Boicote.create({
        autorId: autor.id,
        marca: req.body.marca,
        titulo: (req.body.titulo).replace(/(<([^>]+)>)/gi, ''),
        texto: (req.body.texto).replace(/(<([^>]+)>)/gi, ''),
        tags: req.body.tags,
        aprovado: Date.now(), // TODO - SISTEMA DE APROVAÇÃO
        token: Crypto.randomBytes(100).toString('hex').slice(0, 100),
      });
      // LINKS
      Object.values(links).forEach(async (link) => {
        await Link.create({ link, boicoteId: boicote.id });
      });
      // ENVIAR E-MAIL PARA O AUTOR CONFIRMAR
      const html = confirmaBoicoteHtmlTemplate(boicote, autor);
      const mail = {
        from: `"Boicote.App" <${process.env.MAIL_USERNAME}>`,
        to: autor.email,
        subject: 'Confirmação a criação do seu Boicote criado no Boicote.App',
        html,
      };
      nodemailer.sendMail(mail);
      //
      boicote.token = null; // GAMB VIOLENTA. SEQUELIZE SHOW DE BOLA.
      return res.json(boicote);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json([{
          message: 'Informe o ID do Boicote.',
        }]);
      }
      const boicote = await Boicote.findOne({
        where: {
          id,
          confirmado: { [Op.ne]: null },
          aprovado: { [Op.ne]: null },
          deletedAt: null,
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
        }],
        attributes: {
          include: [
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = Boicote.id AND votos.cima = true AND deletedAt IS NULL)'), 'cimaVotos'],
            [literal('(SELECT COUNT(*) FROM votos WHERE votos.boicoteId = Boicote.id AND votos.cima = false AND deletedAt IS NULL)'), 'baixoVotos'],
            [literal('(SELECT COUNT(*) FROM comentarios WHERE comentarios.boicoteId = Boicote.id AND deletedAt IS NULL)'), 'comentariosCount'],
          ],
          exclude: ['autorId', 'updatedAt', 'deletedAt', 'token'],
        },
        order: [['createdAt', 'ASC']],
      });

      if (!boicote) {
        return res.status(400).json([{
          message: 'Boicote não existe.',
        }]);
      }

      return res.status(200).json(boicote);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  async confirmar(req, res) {
    try {
      const { token, boicoteId } = req.params;

      if (!token || !boicoteId) {
        return res.status(400).json([{
          message: 'Informe o Token e o ID do Boicote.',
        }]);
      }

      const boicote = await Boicote.findByPk(boicoteId);

      if (!boicote) {
        return res.status(400).json([{
          message: 'Boicote não existe.',
        }]);
      }

      if (boicote.token !== token) {
        return res.status(400).json([{
          message: 'Token inválido.',
        }]);
      }

      if (boicote.confirmado === null) {
        boicote.confirmado = Date.now();
        boicote.save();

        return res.status(200).json([{
          message: 'Boicote confirmado com sucesso.',
        }]);
      }
      return res.status(400).json([{
        message: 'Boicote já confirmado.',
      }]);
    } catch (e) {
      return res.status(400).json(e.errors);
    }
  }

  /*
  async delete(req, res) { // TODO - CONFIRMAR EXCLUSÃO POR E-MAIL
    // TODO
  }
  */
  //
}

module.exports = new BoicotesController();
