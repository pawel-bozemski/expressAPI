const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');


router.get('/concert', ConcertsController.getAll);

router.get('/concert/random', ConcertsController.getRandom);

router.get('/concert/:id', ConcertsController.getId);

router.post('/concert', ConcertsController.post);

router.put('/concert/:id', ConcertsController.put);

router.delete('/concert/:id', ConcertsController.delete);

module.exports = router;
