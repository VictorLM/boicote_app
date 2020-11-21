const { boicotes } = require('../models');

class BoicotesController {
  //
  async index(req, res) {
    const texts = await boicotes.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      order: [['createdAt', 'DESC']],
    });

    return res.json(texts);
  }

  async store(req, res) {
    try {
      const text = await boicotes.create(req.body);

      return res.json(text);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Informe o ID'],
        });
      }

      const text = await boicotes.findByPk(id);

      if (!text) {
        return res.status(400).json({
          errors: ['Escritório não existe'],
        });
      }

      const updatedText = await text.update(req.body);
      return res.json(updatedText);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Informe o ID'],
        });
      }

      const text = await boicotes.findByPk(id);

      if (!text) {
        return res.status(400).json({
          errors: ['Texto não existe'],
        });
      }

      await text.destroy();
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
