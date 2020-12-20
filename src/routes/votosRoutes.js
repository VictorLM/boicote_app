const { Router } = require('express');
const VotosController = require('../controllers/VotosController');

const router = new Router();

router.get('/', VotosController.index);
router.post('/:boicoteId', VotosController.store);

module.exports = router;
