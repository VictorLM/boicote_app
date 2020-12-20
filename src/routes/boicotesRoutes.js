const { Router } = require('express');
const BoicotesController = require('../controllers/BoicotesController');

const router = new Router();

router.get('/', BoicotesController.index);
router.get('/:id', BoicotesController.show);
router.post('/', BoicotesController.store);

module.exports = router;
