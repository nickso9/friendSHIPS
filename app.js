const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const server = app.listen(port, () => console.log('server running.'))
const io = require('./socket').init(server);

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`

app.use(express.json())

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
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

