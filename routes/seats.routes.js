const express = require('express');
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');


router.get('/concert', SeatsController.getAll);

router.get('/concert/:id', SeatsController.getId);

router.post('/concert', SeatsController.post);

router.put('/concert/:id', SeatsController.put);

router.delete('/concert/:id', SeatsController.delete);


module.exports = router;

