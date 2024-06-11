const express=require('express');
const entryRoute=require('./routes/entry');
const userRoute=require('./routes/user');
const path=require('path');
const {connectMongoDb}=require('./connectDb');
const User=require('./models/user');
const Entry=require('./models/entry');

const app=express();
const PORT=8000;

connectMongoDb('mongodb://localHost:27017/travel-diary')
.then(()=>console.log("Database Connected"));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/user', userRoute);
app.use('/entry', entryRoute);



app.listen(PORT, ()=>console.log(`Server has started at PORT: ${PORT}`));
