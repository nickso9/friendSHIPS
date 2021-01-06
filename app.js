const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

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

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`
//   )
//   .then(result => {
//     app.listen(8080)
//   })
//   .catch(err => console.log(err));
