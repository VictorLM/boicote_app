const { Router } = require('express');
const BoicotesController = require('../controllers/BoicotesController');

// import loginRequired from '../middlewares/loginRequired'; // TODO

const router = new Router();

// SHOW ROUTE? TODO
router.get('/', BoicotesController.index);
router.post('/', BoicotesController.store); // TODO MIDDLEWARE
router.put('/:id', BoicotesController.update); // TODO MIDDLEWARE
router.delete('/:id', BoicotesController.delete); // TODO MIDDLEWARE

module.exports = router;
