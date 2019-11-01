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

//maybe add io back in
function playSong(access_token, deviceId, spotify_uri) {
  const options = {
  url: 'https://api.spotify.com/v1/me/player/play?device_id=' + deviceId,
  body: JSON.stringify({ uris: [spotify_uri] }),
  headers: {
    "Authorization": `Bearer ${access_token}`,
    "Content-Type": "application/json",
  },
};

    request.put(options, function(error, response, body) {
        // song_uri = body.display_name;
        // body=JSON.parse(body);
        // io.emit("play_song", message, body["display_name"]);
        console.log("Playing lost kings")
    })

}

module.exports.userConnected = userConnected;
module.exports.chatMessage = chatMessage;
module.exports.playSong = playSong;
