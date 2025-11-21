const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/meanDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));


const user=new mongoose.Schema({
  email: {
    type:String,
    required:true
  },
  password: {
    type:String,
    required:true
  },
  username:String,
  budget: [],
  expenses: []
})
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(3000, '0.0.0.0', () => console.log(' Server running on port 3000'));

