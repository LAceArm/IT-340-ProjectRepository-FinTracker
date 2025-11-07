const express=require('express');

const mongoose=require('mongoose');

const app=express();

const dbURL='mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.9'


const port=3000;

app.get('/',(req,res)=>{
    res.send("Backend is functional");
});

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
<<<<<<< HEAD:backend/server.js
=======

mongoose.connect(dbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('Connected to MongoDB'))
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});
>>>>>>> ef104252274f4d2e2ff639829362edf4a0897863:server.js
