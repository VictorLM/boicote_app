const { Router } = require('express');
const BoicotesController = require('../controllers/BoicotesController');

const router = new Router();

router.get('/', BoicotesController.index);
router.get('/:id', BoicotesController.show);
router.post('/', BoicotesController.store);
router.get('/confirmar/:boicoteId/:token', BoicotesController.confirmar);

module.exports = router;
