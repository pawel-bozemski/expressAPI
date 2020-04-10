/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
const uniqid = require('uniqid');
const Seats = require('../models/seats.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const seat = await Seats.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const {
      client, seat, email, day,
    } = req.body;
    const newSeat = new Seats({
      id: uniqid(),
      client,
      seat,
      email,
      day,
    });
    await newSeat.save();
    res.json(newSeat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const {
    day, seats, client, email,
  } = req.body; try {
    const seat = await (Seats.findById(req.params.id));
    if (seat) {
      seat.day = day;
      seat.seats = seats,
      seat.client = client;
      seat.email = email;
      await seat.save();
      res.json(seat);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


exports.delete = async (req, res) => {
  try {
    const seat = await (Seats.findById(req.params.id));
    if (seat) {
      await Seats.deleteOne({ _id: req.params.id });
      res.json(seat);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
