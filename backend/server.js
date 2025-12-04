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
module.exports = userModel;
app.get('/', (req, res) => {
  res.send('Backend is running');
});
/* 
  USING THE MODEL:
  on the top of any page using that will use the model, write 
  import userModel from (Path to this file)

  for register, the query will look like 
  const (varname)= await userModel.create((Credentials the user will input))

  for login, the query will search for a user's email, and it will look like
  const (varname)= await userModel.findOne({email: '(User email)'})
  to check the password I'm a little unsure, but it should be (varname).password.
  Of course, you will have to unhash the value first.
*/

app.listen(3000, '0.0.0.0', () => console.log(' Server running on port 3000'));

