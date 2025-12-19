const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
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


//Register
app.post('/register', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Create user
    const user = await userModel.create({
      email,
      password,
      username
    });

    res.json({ success: true, message: "Registration successful", user });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});
//Login

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'Email not found' });
    }

    if (user.password !== password) {
      return res.json({ success: false, message: 'Incorrect password' });
    }

    res.json({
      success: true,
      userId: user._id
 });
  } 
  catch (err) {
    res.json({ success: false, message: 'Server error' });
  }
});


app.listen(3000, '0.0.0.0', () => console.log(' Server running on port 3000'));

// Budget


// Add budget item
app.post('/budget/:userId', async (req, res) => {
  try {
    const { partName, partAmount } = req.body;

    const user = await userModel.findById(req.params.userId);
    user.budget.push({ partName, partAmount });
    await user.save();

    res.json({ success: true, budget: user.budget });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// Add expense
app.post('/expense/:userId', async (req, res) => {
  try {
    const { expenseName, expenseAmount } = req.body;

    const user = await userModel.findById(req.params.userId);
    user.expenses.push({ expenseName, expenseAmount });
    await user.save();

    res.json({ success: true, expenses: user.expenses });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});



