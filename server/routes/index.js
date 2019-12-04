var express = require('express');
var request = require('request');
var router = express.Router();
//Retrieves env variables from .env file
//var dotenv = require('dotenv').config();
var urls = require('../constants.js');
var Chatroom = require('../chatroom/Chatroom.js');
const {Client} = require('pg');
const client = new Client({
  user: 'iddgxdpmzvrgnq',
  host: 'ec2-54-83-55-122.compute-1.amazonaws.com',
  database: 'd5a45rpdbn8ojc',
  password: 'ed9db27f9307fbe752382ed5e5d87ca5eb01240893e16afa65bff0bab8530c8d',
  port: 5432,
  ssl: true
})
client.connect();


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
    console.log(redirect_uri);
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
    var refresh_token = body.refresh_token
    let uri = urls.frontend_uri
    res.redirect(uri + '?access_token=' + access_token + '&refresh_token=' + refresh_token)
  })
  });

  router.post('/realLogin', function(req, res) {
    if (req.body.access_token) {
      let authOptions = {
        url: 'https://api.spotify.com/v1/me',
        headers: {
          authorization: `Bearer ${req.body.access_token}`
        },
        json: true
      }
      request.get(authOptions, function(error, response, body) {
        var userInfo = body;
        client.query('INSERT INTO "music_chatroom".users(display_name, email, external_spotify_url, id, profile_image, product, username, about_me, music_taste) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [userInfo.display_name, userInfo.email, userInfo.external_urls.spotify, userInfo.id, userInfo.images[0].url, userInfo.product, '', '', ''], function(err, resp) {
            if (err) {
              console.log("User already exists in database!");
            }
        });
      });
    }
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
    
    var genres = "";
    if (request.genres.length === 1) {
      genres = request.genres[0];
    }
    else if (request.genres.length === 2) {
      genres = request.genres[0] + ", " + request.genres[1];
    }

    let query_err = false;

    client.query('INSERT INTO "music_chatroom".lounges(name, lounge_master, description, genres) VALUES ($1, $2, $3, $4)', 
        [request.name, request.loungeMasterName, request.desc, genres], function(err, resp) {
          if (err) {
            query_err = true;
            console.log("Lounge name already exists in database!");
          }
          req.app.locals.idCounter++;

          res.json({query_error: query_err, 
            lounge_info: new_chatroom.minimalInfo()});
    });
  })
module.exports = router;
