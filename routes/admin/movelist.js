var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path')
var fs = require('fs')
var Db = require('../../mongodb/mongoose')
var db = new Db('baofeng')
/* GET home page. */
router.get('/', function (req, res, next) {
    db.find('films', {}, (ret) => {
        //  console.log(ret,'ddddd') 
        res.render('movelist', { list: ret });
    })

});
router.get('/del', function (req, res, next) {
    let id = req.query.id;
    db.deleteOne('films', id, (ret) => {
        // console.log(ret, 'ddddd')
        res.redirect('http://localhost:4001/admin/move')
    })

});

router.post('/', function(req, res, next) {
    var fm = new formidable.IncomingForm();
    fm.uploadDir = './public/temp'
    fm.parse(req,(err,fields,files)=>{
        if(err){
            console.log('上传失败')
        }else{
        //  console.log(fields,'23333333')
         var newPath = 'public'+'\\'+ 'images' + '\\'  + new Date().getTime() + path.extname(files.url.name);
         var oldPath = files.url.path;
        //  console.log(oldPath, newPath)
         fs.rename(oldPath, newPath, (err) => {
            if (err) {
                res.send('上传失败')
            } else {
               let id = fields.id
               let data = {
                   title:fields.title,
                   message:fields.message,
                   txt:fields.txt,
                   type:fields.type,
                   grade:fields.grade,
                   url:newPath.substring(7,13)+'/'+newPath.substring(14)
               };
              db.upDateOne('films',id,data,(ret)=>{
                //   console.log(ret)
                   res.redirect('http://localhost:4001/admin/move')
              })
                //res.redirect()当成功的时候跳转一个新的地址
               
            }
        })
        }
    })
    // console.log(req.query)
    // res.render('movelist');
});

module.exports = router;