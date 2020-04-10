const express = require('express');

const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');


router.route('/concerts').get(ConcertsController.getAll);

router.route('/concerts/random').get(ConcertsController.getRandom);

router.route('/concerts/:id').get(ConcertsController.getId);

router.route('/concerts').post(ConcertsController.post);

router.route('/concerts/:id').put(ConcertsController.put);

router.route('/concerts/:id').delete(ConcertsController.delete);

module.exports = router;
