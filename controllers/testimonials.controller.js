/* eslint-disable no-undef */
const Testimonials = require('../models/testimonials.models');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonials.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonials.findOne().skip(rand);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const testimonial = await Testimonials.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonials({ author, text });
    await newTestimonial.save();
    res.json(newTestimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { author, text } = req.body;
  try {
    const testimonial = await (Testimonials.findById(req.params.id));
    if (testimonial) {
      testimonial.author = author;
      testimonial.text = text;
      await testimonial.save();
      res.json(testimonial);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


exports.delete = async (req, res) => {
  try {
    const testimonial = await (Testimonials.findById(req.params.id));
    if (testimonial) {
      await Testitestimonialmonials.deleteOne({ _id: req.params.id });
      res.json(concert);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
