
const connectedUsers = {}

module.exports = function (socket) {
    let usernameid;
    console.log(connectedUsers)
    socket.on('setUserId', (username) => {
        connectedUsers[username] = socket.id;
        usernameid = username
    })

    socket.on('message', (to, message) => {

        const id = connectedUsers[to];
        socket.to(id).emit('sendPrivateMessage', usernameid, message);
    })

}