function userConnected(socket) {

    console.log('a new user has connected');
    
}

function userDisconnected() {

    console.log('user has disconnected');

}
function chatMessage(message) {

    console.log('user says: ' + message);

}

module.exports.userConnected = userConnected;
module.exports.chatMessage = chatMessage;
