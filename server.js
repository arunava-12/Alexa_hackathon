const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Entry = require('./models/Entry');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hostelDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.post('/addEntry', (req, res) => {
  const newEntry = new Entry(req.body);
  newEntry.save()
    .then(entry => res.json(entry))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/searchByName/:name', (req, res) => {
  Entry.find({ name: req.params.name })
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/searchByRoom/:roomNo', (req, res) => {
  Entry.find({ hostelRoomNo: req.params.roomNo })
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
