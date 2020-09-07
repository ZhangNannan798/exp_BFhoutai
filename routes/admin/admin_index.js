var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/admin', function(req, res, next) {
    res.render('admin_index');
});
router.get('/admin/quit',function(req,res,next){
    // console.log(1111)
    delete req.session.adminLogin;
    res.render('admin_login');
})

module.exports = router;