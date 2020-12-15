const { Router } = require('express');
const BoicotesController = require('../controllers/BoicotesController');

const router = new Router();

router.get('/', BoicotesController.index);
router.post('/', BoicotesController.store);

module.exports = router;
