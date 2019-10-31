var request = require('request');
function userConnected(socket) {

    console.log('a new user has connected');
    console.log(socket);
}

function userDisconnected() {

    console.log('user has disconnected');

}
function chatMessage(io, message, auth_token) {
    var url = 'https://api.spotify.com/v1/me?access_token=' + auth_token;
    var username;
    request(url, function(error, response, body) {
        username = body.display_name;
        body=JSON.parse(body);
        io.emit("message_received", message, body["display_name"]);
    })

}

module.exports.userConnected = userConnected;
module.exports.chatMessage = chatMessage;
