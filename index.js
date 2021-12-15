const express = require('express');
const app= express();
const mongoose = require('mongoose');
const dotenv=require('dotenv');
//Import Route
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

//PORT
var PORT=process.env.PORT || 3000;

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
() => console.log('connected to DB')
);

//Middleware
app.use(express.json());


//Route Middleware
app.use('/api/user', authRoute);
app.use('/api/posts',postRoute);


app.listen(PORT,()=>console.log('Server Up and running'));