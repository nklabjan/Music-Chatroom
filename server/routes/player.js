var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(next);
  res.send('respond with a player resource');
});

module.exports = router;
