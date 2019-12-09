describe('loading express', function() {
    var server;
    var request = require('supertest');
    var app;
    var io;
    var Chatroom = require('../chatroom/Chatroom.js');
    beforeEach(function() {
        app = require('../app.js');
        var http = require('http');
        var port = '8080';
        app.set('port', port);
        server = http.createServer(app);
        io = require('socket.io')(server);
    });

    afterEach(function() {
        app.locals.dbClient.end();
    })

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
    it ('responds to /player', function testPlayer(done) {
        request(server).get('/player').expect(200, done);
    })
    it ('responds to /player/get', function testPlayerGet(done) {
        request(server).get('/player/get').expect(200, done);
    })
    it ('responds to /getLounges', function testGetLounges(done) {
        app.locals.chatrooms[1] = new Chatroom.Chatroom(io, 2, {"loungeMasterName": "michael", "loungeMasterID": 8});
        request(server).get('/getLounges').expect(200, done);
    })
    
    it ('createLounge responds to post', function testPostCreateLounge(done) {
        request(server).post('/createLounge')
            .send({"name": "test",
                   "loungeMasterName": "testName",
                   "loungeMasterID" : 1,
                   "desc": "generic",
                   "genres": ["toddler rock"] })
            .expect(200, done)
    });
    it ('createLounge multiple genres' , function testCreateLounge2(done) {

        request(server).post('/createLounge')
            .send({"name": "test2",
                   "loungeMasterName": "michael",
                   "loungeMasterID" : 1,
                   "desc" : "generic2",
                   "genres" : ["genre1","genre2"]})
            .expect(200, done);
        
    })
    it ('responds to /users', function testUsers(done) {
        request(server).get('/users').expect(200,done);
    })
});

describe('Chatroom tests', function() {
    var server
    var request = require('supertest');
    var app;
    var io;
    var assert = require('assert');
    var Chatroom = require('../chatroom/Chatroom.js');
    var cr;
    var client;
    beforeEach(function() {
        app = require('../app.js');
        var http = require('http');
        var port = '8080';
        app.set('port', port);
        server = http.createServer(app);
        io = require('socket.io')(server);
        cr = new Chatroom.Chatroom(io, 1, {"loungeMasterName": "michael",
                                           "loungeMasterID": 7});
        client = require('socket.io-client')(server);
    })
    afterEach(function() {
        app.locals.dbClient.end();
        client.disconnect();
    })

    it ('test userConnected', function userConnected(done) {

        var mockUserInfo = { display_name: "michael",
                             id: "1",
                             image: null,
                             spotify_url: null,
                             uri: null,
                             country: "USA"}
        cr.userConnected(io, 1, mockUserInfo);
        if (cr.users[io.id]  !== undefined) {
            done();
        }
        else {
            done(new Error("user is not in the user list"));
        }
    })

    it ('test userDisconnected', function userDisconnected(done) {
        var mockUserInfo = {
            display_name: "michael",
            id: "1",
            image: null,
            spotify_url: null,
            uri: null,
            country: "USA"
        }
        cr.userConnected(io, 1, mockUserInfo);
        done();
    })

    it('test mockqueue', function mockQueueNotEmpty(done) {
        cr.loadMockQueue();
        // mock queue is only for testing -- check that running it
        // doesn't crash anything and be happy with that
        done();
    })

    it('test getCurrentSong', function getCurrentSongNullToken(done) {
        cr.getCurrentSong(io);
        done();
    })


})



