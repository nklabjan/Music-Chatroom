function userConnected(socket) {

    console.log('a new user has connected');
    socket.on('disconnect', userDisconnected);
}

function userDisconnected() {

    console.log('user has disconnected');
}

function chatMessage() {
    
}

module.exports.userConnected = userConnected;
