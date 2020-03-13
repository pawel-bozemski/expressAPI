const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const testimonialRoute = require('./routes/testimonials.routes');
const concertsRoute = require('./routes/concerts.routes');
const seatsRoute = require('./routes/seats.routes');

app.use('/api', testimonialRoute);
app.use('/api', concertsRoute);
app.use('/api', seatsRoute);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () =>
console.log(`Example app listening on port ${8000}!`));