const express = require('express');
const uniqid = require('uniqid');
const db = require('../db');
const router = express.Router();


router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});
router.route('/concerts/random').get((req, res) => {
  res.json(db.concerts[Math.floor(Math.random()* db.concerts.length)]);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.filter(point => point.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  const {performer, genre, price, day, image}  = req.body;
  const userData = {
    id: uniqid(),
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
  };
  db.concerts.push(userData);
  res.json(db.concerts);
});

router.route('/concerts/:id').put((req, res) => {
  const {performer, genre, price, day, image}  = req.body;
  db.concerts.map(point =>
    point.id === req.params.id ?
    {...point,
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    }
    :point
    );
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts.filter(point => point.id !== req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;
