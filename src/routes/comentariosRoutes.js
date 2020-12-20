const { Router } = require('express');
const ComentariosController = require('../controllers/ComentariosController');

const router = new Router();

router.post('/:boicoteId', ComentariosController.store);

module.exports = router;
