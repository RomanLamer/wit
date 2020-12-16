const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = process.env.PORT || 5000;
const mongoUri = `mongodb+srv://roman:qwer556677@cluster0.skktd.mongodb.net`;

app.use(express.static('client'))
app.use(express.json({ extended:true}))
app.use(cookieParser());
app.use('/api/auth',require('./routes/auth'));
app.use(cors());

async function start() {
    try {
       await mongoose.connect(mongoUri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
       })
       app.listen(PORT, ()=>{
        console.log(`Server has been started on port ${PORT}...`);
    })
    } catch (e) {
        throw e
    }
}

start();