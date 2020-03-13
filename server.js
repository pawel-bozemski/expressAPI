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


app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});
app.get('/concerts/random', (req, res) => {
  res.json(db.concerts[Math.floor(Math.random()* db.concerts.length)]);
});

app.get('/concerts/:id', (req, res) => {
  res.json(db.concerts.filter(point => point.id == req.params.id));
});

app.post('/concerts', (req, res) => {
  const {performer, genre}  = req.body;
  const userData = {
    id: uniqid(),
    performer: performer,
    genre: genre,
  };
  db.concerts.push(userData);
  res.json(db.concerts);
});

app.put('/concerts/:id', (req, res) => {
  const {performer, genre}  = req.body;
  db.concerts.map(point =>
    point.id === req.params.id ?
    {...point, performer: performer, genre: genre}
    :point
    );
  res.json({ message: 'OK' });
});

app.delete('/concerts/:id', (req, res) => {
  db.concerts.filter(point => point.id !== req.params.id);
  res.json({ message: 'OK' });
});


app.get('/seats', (req, res) => {
  res.json(db.seats);
});
app.get('/seats/random', (req, res) => {
  res.json(db.seats[Math.floor(Math.random()* db.seats.length)]);
});

app.get('/seats/:id', (req, res) => {
  res.json(db.seats.filter(point => point.id == req.params.id));
});

app.post('/seats', (req, res) => {
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

app.put('/seats/:id', (req, res) => {
  const {client, seat, email}
  db.seats.map(point =>
    point.id === req.params.id ?
    {...point, client: client, seat: seat, email:email}
    :point
    );
  res.json({ message: 'OK' });
});

app.delete('/seats/:id', (req, res) => {
  db.seats.filter(point => point.id !== req.params.id);
  res.json({ message: 'OK' });
});


app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () =>
console.log(`Example app listening on port ${8000}!`));