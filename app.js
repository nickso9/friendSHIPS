const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();
const app = express();

const server = app.listen(8080, () => console.log('server running.'))
const io = require('./socket').init(server);

app.use(cors());

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
    console.log('db connected')
})
.catch(err => console.log(err))



io.on('connection', socket => {
    require('./controllers/chat')(socket)
    return io
});



const usersRoute = require('./routes/user');
const userRoute = require('./routes/actions')

app.use('/users', usersRoute)
app.use('/user', userRoute)
