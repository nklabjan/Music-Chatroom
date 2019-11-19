describe('loading express', function() {
    var server;
    var request = require('supertest');
    var app;
    var io;
    beforeEach(function() {
        app = require('../app.js');
        var http = require('http');
        var port = '8080';
        app.set('port', port);
        server = http.createServer(app);
        io = require('socket.io')(server);
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
    it ('responds to /player', function testPlayer(done) {
        request(server).get('/player').expect(200, done);
    })
    it ('responds to /player/get', function testPlayerGet(done) {
        request(server).get('/player/get').expect(200, done);
    })
    it ('responds to /getLounges', function testGetLounges(done) {
        request(server).get('/getLounges').expect(200, done);
    })

    it ('createLounge responds to post', function testPostCreateLounge(done) {
        request(server).post('/createLounge')
            .send({"name": "test",
                   "loungeMasterName": "testName",
                   "loungeMasterID" : 1,
                   "desc": "generic",
                   "genres": "toddler rock"})
            .expect(200, done)
        
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
    beforeEach(function() {
        app = require('../app.js');
        var http = require('http');
        var port = '8080';
        app.set('port', port);
        server = http.createServer(app);
        io = require('socket.io')(server);
    })

    it('test mockqueue', function mockQueueNotEmpty(done) {
        var cr = new Chatroom.Chatroom(io, 1, {"loungeMasterName": "michael",
                                      "loungeMasterID": 7});
        cr.loadMockQueue();
        // mock queue is only for testing -- check that running it
        // doesn't crash anything and be happy with that
        done();
    })


})



