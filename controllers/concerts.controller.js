const Concerts = require('../models/concerts.models');
const uniqid = require('uniqid');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concerts.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concerts.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concerts.findOne().skip(rand);
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const concert = await Concerts.findById(req.params.id);
    if(!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const {performer, genre, price, day, image}  = req.body;
    const newConcert = new Concerts({
      id: uniqid(),
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
   });
    await newConcert.save();
    res.json(newConcert);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const {performer, genre, price, day, image}  = req.body;
  try {
    const concert = await(Concerts.findById(req.params.id));
    if(concert) {
      concert.performer = performer,
      concert.genre = genre,
      concert.price = price,
      concert.day = day,
      concert.image = image,
      await concert.save();
      res.json(concert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};


exports.delete = async (req, res) => {
  try {
    const concert = await(Concerts.findById(req.params.id));
    if(concert) {
      await Concerts.deleteOne({ _id: req.params.id });
      res.json(concert);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
