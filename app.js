const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();
const app = express();
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`

app.use(express.json())

mongoose.connect(uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true , 
        useCreateIndex: true,
        useFindAndModify: false 
    }
).then(() => { 
    console.log('connected')
    app.listen(8080, () => {
        console.log('and listening')
    })
 },
    (err) => {  
        console.log(err)
    }
);

const userRoute = require('./routes/user');

app.use('/users', userRoute)
