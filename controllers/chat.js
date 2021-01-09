const clients = {}

module.exports = function(socket) {

    socket.on('setUserId', function(userId){
        clients[userId] = socket.id;
        
    });

    
    


}