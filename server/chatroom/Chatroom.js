class Chatroom {
    constructor(io) {
        this.userCount = 0;
        this.request = require('request');
        this.io = io;
        // cache of sockets against user info
        this.users = {};
        this.messageList = [];
    }
    userConnected(socket, accessToken) {
        // when a new user connects, get profile information
        console.log(this.messageList);
        var url = 'https://api.spotify.com/v1/me?access_token=' +accessToken;
        var chatroom = this; // alias this as chatroom so it can be referenced in async call
        this.request(url, function(error, response, body) {
            body = JSON.parse(body);
            chatroom.users[socket] = body["display_name"];
        })

        for (var indx in this.messageList) {
            var msgPayload = this.messageList[indx];
            //this.io.emit("message_received", msgPayload['msg'], msgPayload['user']);
            socket.emit("message_received", msgPayload['msg'], msgPayload['user']);
        }

    }

    playSong(accessToken, deviceId, spotifyURI)
    {
        
    }

    chatMessage(socket, message) {
        this.messageList.push({'user': this.users[socket], 'msg' : message });
        this.io.emit("message_received", message, this.users[socket]);
    }
}

module.exports.Chatroom = Chatroom;
