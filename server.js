const express = require('express');
const uniqid = require('uniqid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});
app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random()* db.testimonials.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials.filter(point => point.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const {author, text}  = req.body;
  const userData = {
    id: uniqid(),
    author: author,
    text: text,
  };
  db.testimonials.push(userData);
  res.json(db.testimonials);
});

app.put('/testimonials/:id', (req, res) => {
  const {author, text}  = req.body;
  db.testimonials.map(point =>
    point.id === req.params.id ?
    {...point, author: author, text: text}
    :point
    );
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  db.testimonials.filter(point => point.id !== req.params.id);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () =>
console.log(`Example app listening on port ${8000}!`));