const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const testimonialRoute = require('./routes/testimonials.routes');
const concertsRoute = require('./routes/concerts.routes');
const seatsRoute = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/', testimonialRoute);
app.use('/api/', concertsRoute);
app.use('/api/', seatsRoute);

mongoose.connect('mongodb+srv://Pawcio:pawcioapka@cluster0-5lmdn.mongodb.net/newWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log(`Error ${err}`));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// Serve static files from the React app

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/client/build/index.html`));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});
