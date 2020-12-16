const { Router } = require('express');
const VotosController = require('../controllers/VotosController');

const router = new Router();

router.get('/', VotosController.index);
router.post('/', VotosController.store);

module.exports = router;
