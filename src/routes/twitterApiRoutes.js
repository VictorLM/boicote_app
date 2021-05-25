const { Router } = require('express');
const TwitterApiController = require('../controllers/TwitterApiController');

const router = new Router();

router.get('/', TwitterApiController.getTweets);

module.exports = router;
