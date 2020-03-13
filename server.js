const express = require('express');
const uniqid = require('uniqid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Mark Doe', text: 'This company is worth every penny!' },
  { id: 4, author: 'Henry Doe', text: 'This company is best!' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});
app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random()* db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter(point => point.id == req.params.id));
});

app.post('/testimonials', (req, res) => {
  const {author, text}  = req.body;
  const userData = {
    id: uniqid(),
    author: author,
    text: text,
  };
  db.push(userData);
  res.json(db);
});

app.put('/testimonials/:id', (req, res) => {
  const {author, text}  = req.body;
  db.map(point =>
    point.id === req.params.id ?
    {...point, author: author, text: text}
    :point
    );
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  db.filter(point => point.id !== req.params.id);
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
})

app.listen(8000, () =>
console.log(`Example app listening on port ${8000}!`));