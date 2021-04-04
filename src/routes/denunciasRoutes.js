const { Router } = require('express');
const DenunciasController = require('../controllers/DenunciasController');

const router = new Router();

router.post('/boicote/:boicoteId', DenunciasController.denunciarBoicote);
router.post('/comentario/:comentarioId', DenunciasController.denunciarComentario);

module.exports = router;
