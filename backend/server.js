const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.9', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));

const Budget=new mongoose.Schema({
    partName: {
      type:String,
      require: true
    },
    partAmount: {
      type: Number,
      require:true
    }
});

const Expenses=new mongoose.Schema({
    expenseName: {
      type: String,
      require: true
    },
    expenseAmount: {
        type: Number,
        require: true
    }
});
const User=new mongoose.Schema({
  email: {
    type:String,
    require:true
  },
  password: {
    type:String,
    require:true
  },
  username:String,
  budget: [Budget],
  expenses: [Expenses]
});

var userModel=mongoose.model('User',User);
export default userModel;
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(3000, '0.0.0.0', () => console.log(' Server running on port 3000'));

