
const connectedUsers = {}

module.exports = function (socket) {
    let usernameid;
    console.log(connectedUsers)
    socket.on('setUserId', (username) => {
        connectedUsers[username] = socket.id;
        usernameid = username
    })

    socket.on('message', (to, message) => {
        
        console.log('on message.')
        console.log(to)
        console.log(message)
        const id = connectedUsers[to];
        console.log(id)
        console.log(connectedUsers)

        socket.to(id).emit('sendPrivateMessage', usernameid, message);
    })

}