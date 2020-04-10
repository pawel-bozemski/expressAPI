const express = require('express');

const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

router.route('/testimonials').get(TestimonialsController.getAll);

router.route('/testimonials/random').get(TestimonialsController.getRandom);

router.route('/testimonials/:id').get(TestimonialsController.getId);

router.route('/testimonials').post(TestimonialsController.post);

router.route('/testimonials/:id').put(TestimonialsController.put);

router.route('/testimonials/:id').delete(TestimonialsController.delete);

module.exports = router;
