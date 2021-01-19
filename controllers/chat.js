
const connectedUsers = {}

module.exports = function (socket) {

    let usernameid;
    let friendsArray = []
    
    socket.on('setUserId', (username) => {
        connectedUsers[username] = socket.id;
        usernameid = username
    })

    socket.on('setOnlineFriends', (friends) => {
        friendsArray.push(...friends)
        const onlineFriends = friendsArray.filter(friend => connectedUsers[friend] ? true : '')
        socket.emit('userFriends', onlineFriends)
    })

    socket.on('setToFriendsOnline', (id) => {
        let tellFriends = [...friendsArray]
        for (let i = 0; i < friendsArray.length; i++) {
            socket.to(connectedUsers[tellFriends[i]]).emit('onlineReciever', id)
        }
    })

    socket.on('setToFriendsOffline', (id) => {
        let tellFriends = [...friendsArray]
        for (let i = 0; i < friendsArray.length; i++) {
            socket.to(connectedUsers[tellFriends[i]]).emit('offlineReciever', id)
        }
    })

    socket.on('message', (to, message) => {
        const id = connectedUsers[to];
        socket.to(id).emit('sendPrivateMessage', usernameid, message);
    })

    socket.on('action', (to) => {
        const id = connectedUsers[to]
        socket.to(id).emit('pushAction', to)
    })

    socket.on('onlineNow', (from, to) => {
        if (connectedUsers[from]) {
            socket.emit('onlineReciever', from)
            socket.to(connectedUsers[from]).emit('onlineReciever', to)
        }
    })

    socket.on('removeFriend', (from, to) => {
        socket.to(connectedUsers[from]).emit('offlineReciever', to)
    })

    socket.on('disconnect', () => {
        delete connectedUsers[usernameid]
    })

    
}