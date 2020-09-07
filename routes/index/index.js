var express = require('express');
var router = express.Router();
var Db = require('../../mongodb/mongoose')
var db = new Db('baofeng')
/* GET home page. */
router.get('/', function (req, res, next) {
  db.find('films', {}, (ret) => {
    //  console.log(ret,'ddddd') 
    res.render('index', { list: ret });
  })
  // res.render('index');
});

module.exports = router;
