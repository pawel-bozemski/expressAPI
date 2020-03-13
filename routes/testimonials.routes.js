const express = require('express');
const uniqid = require('uniqid');
const db = require('../db');
const router = express.Router();

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random()* db.testimonials.length)]);
});

  router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(point => point.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  const {author, text}  = req.body;
  const userData = {
    id: uniqid(),
    author: author,
    text: text,
  };
  db.testimonials.push(userData);
  res.json(db.testimonials);
});

router.route('/testimonials/:id').put((req, res) => {
  const {author, text}  = req.body;
  db.testimonials.map(point =>
    point.id === req.params.id ?
    {...point, author: author, text: text}
    :point
    );
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.filter(point => point.id !== req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;