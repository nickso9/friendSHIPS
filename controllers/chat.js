const { isValidObjectId } = require("mongoose");

const connectedUsers = {}

module.exports = function(socket) {
    let usernameid;

    socket.on('setUserId', (username) => {
        connectedUsers[username] = socket.id;
        usernameid = username
    })
    
    // console.log(connectedUsers)

    socket.on('message', (to, message) => {  
        console.log('on message.')
        console.log(to)
        console.log(message)
        const id = connectedUsers[to];
        
        console.log(usernameid)
        // io.sockets.socket(id).emit('sendPrivateMessage', socket.username, message);
    })


}