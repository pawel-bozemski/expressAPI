const express = require('express');
const uniqid = require('uniqid');
const db = require('../db');
const router = express.Router();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});
router.route('/seats/random').get((req, res) => {
  res.json(db.seats[Math.floor(Math.random()* db.seats.length)]);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter(point => point.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const {client, seat, email}  = req.body;
  const userData = {
    id: uniqid(),
    client: client,
    seat: seat,
    email: email,
  };
  db.seats.push(userData);
  res.json(db.seats);
});

router.route('/seats/:id').put((req, res) => {
  const {client, seat, email} = req.body
  db.seats.map(point =>
    point.id === req.params.id ?
    {...point, client: client, seat: seat, email:email}
    :point
    );
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  db.seats.filter(point => point.id !== req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;
