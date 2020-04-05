var express = require('express');
var request = require('request');
var router = express.Router();
//Retrieves env variables from .env file
//var dotenv = require('dotenv').config();
var urls = require('../constants.js');
var Chatroom = require('../chatroom/Chatroom.js');
// const {Client} = require('pg');
// const client = new Client({
//   user: 'iddgxdpmzvrgnq',
//   host: 'ec2-54-83-55-122.compute-1.amazonaws.com',
//   database: 'd5a45rpdbn8ojc',
//   password: 'ed9db27f9307fbe752382ed5e5d87ca5eb01240893e16afa65bff0bab8530c8d',
//   port: 5432,
//   ssl: true
// })
// client.connect();


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
  var scopes = 'user-read-private user-read-email user-read-playback-state streaming user-modify-playback-state playlist-read-private playlist-read-collaborative';

  res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

router.post('/saveProfile', function(req,res) {
  //At this point use information from req.body to modify data in the database
  //Can only modify about_me, display_name and music_taste at this point
  userInfo = req.body
  req.app.locals.dbClient.query('UPDATE "music_chatroom".users SET display_name = ($1), about_me = ($2), \
                music_taste = ($3) WHERE id = $4',
      [userInfo.display_name, userInfo.about_me, userInfo.music_taste, userInfo.id], function(err, resp) {
      if (err) {
        console.log("Update failed!");
      }
  });
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

router.post('/refreshAuth', function(req, res) {
  let refresh_token = req.body.refresh_token || null
  let authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  form: {
    refresh_token: refresh_token,
    grant_type: 'refresh_token'
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
    
    console.log(body);

    res.json({access_token: access_token});
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

        if (!userInfo.error)
        {
          if (userInfo.images)
          {
            var image = userInfo.images[0].url;
          }
          else image = '';

          req.app.locals.dbClient.query('INSERT INTO "music_chatroom".users(display_name, email, external_spotify_url, id, profile_image, product, about_me, music_taste) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
              [userInfo.display_name, userInfo.email, userInfo.external_urls.spotify, userInfo.id, image, userInfo.product, '', ''], function(err, resp) {
          if (err) {
            console.log("User already exists in database!");
          }
          });

          //At this point user should already exist in the database
          //find user using a query
          //DO NOT USE userInfo but use info pulled from the database
          req.app.locals.dbClient.query('SELECT * FROM "music_chatroom".users WHERE id = ($1)',
                        [userInfo.id], function(err, resp) {
                  if (err) {
                    //This should not print
                    console.log("User DOES NOT exist in the database !");
                  }
                  //Should only return 1 row
                  if (resp.rows.length > 0)
                  {
                    var db_userInfo = resp.rows[0];
                    res.json({userInfo: db_userInfo})
                  }
                });
        }
        else
        {
          //This means that login failed
          res.json({error:"failed"})
        }

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

    req.app.locals.dbClient.query('INSERT INTO "music_chatroom".lounges(name, lounge_master, description, genres) VALUES ($1, $2, $3, $4)',
        [request.name, request.loungeMasterName, request.desc, genres], function(err, resp) {
          req.app.locals.idCounter++;

          res.json({
            lounge_info: new_chatroom.minimalInfo()});
    });
  });
module.exports = router;
