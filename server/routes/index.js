var express = require('express');
var request = require('request');
var router = express.Router();
//Retrieves env variables from .env file
//var dotenv = require('dotenv').config();
var urls = require('../constants.js');
var Chatroom = require('../chatroom/Chatroom.js')


var my_client_id = process.env.CLIENT_APP_ID;
var redirect_uri = urls.backend_url + '/auth/';
//var redirect_uri = "http://localhost:8080/auth/"
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
    console.log(req.app.locals.test)
    console.log(redirect_uri);
  var scopes = 'user-read-private user-read-email user-read-playback-state streaming user-modify-playback-state';

  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });

router.get('/auth', function(req, res) {
    let code = req.query.code || null
    let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.CLIENT_APP_ID + ':' + process.env.CLIENT_APP_SECRET
      ).toString('base64'))
    },
    json: true
  }

  //Get spotify access token and refresh tokens
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = urls.frontend_uri
    res.redirect(uri + '?access_token=' + access_token)
  })
  });

  router.get('/getLounges', function(req, res) {
    let lounges = [];

    for(var key in res.app.locals.chatrooms) {
        var value = res.app.locals.chatrooms[key];

        // do something with "key" and "value" variables
        lounges.push(value.minimalInfo());
      }

    res.json({lounges: lounges})
    });

  router.post('/createLounge', function(req,res) {
    //use chatrooms.length for the id and append to the list
    var new_id = req.app.locals.idCounter;
    var request = req.body
    var new_chatroom = new Chatroom.Chatroom(req.app.locals.io, new_id, request);

    req.app.locals.chatrooms[new_id] = new_chatroom;

    //Only increment when new chatroom is created
    req.app.locals.idCounter++;
    console.log("new room created");

    res.json({lounge_info: new_chatroom.minimalInfo()})

  })
module.exports = router;
