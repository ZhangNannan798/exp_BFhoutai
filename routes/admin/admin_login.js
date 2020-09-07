var express = require('express');
var router = express.Router();
/* GET home page. */
var Db = require('../../mongodb/mongoose')
var db = new Db('baofeng')

router.post('/login', function (req, res, next) {
    //获取input写死的用户名和密码
    // console.log(req.body,'获取数据')
    //添加一条数据到数据库
     /*  db.insert('login',req.body,ret=>{
           console.log(ret,'ret')
      }) */
    // console.log(req.body);
    let { username="", password=""} = req.body;
    // console.log(username, password)
    if (username == '' || password == '') {
        res.render('admin_login')
    } else {
        db.count('login', '', (ret) => {
            if (ret == 1) {
                req.session.adminLogin={
                    username,password
                }
                res.redirect('/admin')
            }else{
                res.redirect('/admin/login')
            }
        })
    }
});
router.get('/login', function (req, res, next) {
    res.render('admin_login');
});

module.exports = router;