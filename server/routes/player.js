var express = require('express');
var router = express.Router();

/* GET player base page. */
router.get('/', function(req, res, next) {
  console.log(next);
  res.send('respond with a player resource');
});

/* GET users listing. */
router.get('/get', function(req, res) {
  res.send('send base player info to client');
});

module.exports = router;
