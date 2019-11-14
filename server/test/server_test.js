describe('loading express', function() {
    var server;
    var request = require('supertest');
    var app;
    beforeEach(function() {
        app = require('../app.js');
        var http = require('http');
        var port = '8080';
        app.set('port', port);
        server = http.createServer(app);
    });

    it('responds to /', function testSlash(done) {
        request(server).get('/').expect(200,done);
    });
    it('bad request', function testBad(done) {
        request(server).get('/bad').expect(404,done);
    });
    it('responds to /login', function testLogin(done) {
        request(server).get('/login/').expect(302, done);
    });
    it ('responds to /auth', function testAuth(done) {
        request(server).get('/auth').expect(302, done);
    });
});

describe('Chatroom tests', function() {
    var server
    var request = require('supertest');
    var app;
    var io;
    var assert = require('assert');
    var chatroom = require('../chatroom/Chatroom.js');
    beforeEach(function() {
        app = require('../app.js');
        var http = require('http');
        var port = '8080';
        app.set('port', port);
        server = http.createServer(app);
        io = require('socket.io')(server);
    })

    it('create chatroom', function testCreateChatroom(done){
        done();
    });
    

})



