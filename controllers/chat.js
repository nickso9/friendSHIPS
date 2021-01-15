
const connectedUsers = {}

module.exports = function (socket) {
    let usernameid;
    socket.on('setUserId', (username) => {
        connectedUsers[username] = socket.id;
        usernameid = username

        
    })

    socket.on('setOnlineFriends', (friends) => {
        let friendArry = [...friends]
        const onlineFriends = friendArry.filter(friend => connectedUsers[friend] ? true : '')
        socket.emit('userFriends', onlineFriends)
    })


    socket.on('message', (to, message) => {
        const id = connectedUsers[to];
        console.log(id)
        socket.to(id).emit('sendPrivateMessage', usernameid, message);
    })

    socket.on('action', (to) => {
        const id = connectedUsers[to]
        socket.to(id).emit('pushAction', to)
    })

}