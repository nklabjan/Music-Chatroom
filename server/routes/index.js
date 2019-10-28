var express = require('express');
var router = express.Router();
//Retrieves env variables from .env file
var dotenv = require('dotenv').config();

var my_client_id = process.env.CLIENT_APP_ID;
var redirect_uri = "http://localhost:3001/"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
  var scopes = 'user-read-private user-read-email';

  res.send('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + my_client_id +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
  });
module.exports = router;
