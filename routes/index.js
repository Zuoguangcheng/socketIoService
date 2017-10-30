var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('启动成功')
  res.send('启动成功：');
});

module.exports = router;
