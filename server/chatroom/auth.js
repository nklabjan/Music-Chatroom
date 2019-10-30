function userConnected(socket) {

    console.log('a new user has connected');
    console.log(socket);
}

function userDisconnected() {

    console.log('user has disconnected');

}
function chatMessage(message, user_id) {

    console.log(user_id +' says: ' + message);

}

module.exports.userConnected = userConnected;
module.exports.chatMessage = chatMessage;
