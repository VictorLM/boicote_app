const { Router } = require('express');
const VisitantesController = require('../controllers/VisitantesController');

const router = new Router();

router.get('/novo-visitante', VisitantesController.novoVisitante);
router.get('/autores', VisitantesController.autores);
router.get('/boicotes', VisitantesController.boicotes);
router.get('/comentarios', VisitantesController.comentarios);
router.get('/votos', VisitantesController.votos);

module.exports = router;
