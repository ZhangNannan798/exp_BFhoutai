var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index/index');
var loginRouter = require('./routes/index/login');
var playRouter = require('./routes/index/play');
var movieRouter = require('./routes/index/movie');

var adminLoginRouter = require('./routes/admin/admin_login');
var adminIndexRouter = require('./routes/admin/admin_index');
var adminMoveRouter = require('./routes/admin/movelist'); //影片管理列表
var adminAddRouter = require('./routes/admin/addmove'); //影片管理列表新增
var adminZtRouter = require('./routes/admin/ztlist'); //专题管理列表
var adminZteditRouter = require('./routes/admin/ztedit'); //专题管理列表新增
var adminHyRouter = require('./routes/admin/hymanage'); //会员管理列表
var adminHyeditRouter = require('./routes/admin/hyedit');  //会员管理列表新增
var adminGlyRouter = require('./routes/admin/glymanage'); //管理员列表
var adminGlyeditRouter = require('./routes/admin/glyedit');  //管理员列表新增

var app = express();


// view engine setup
app.engine('html',require('ejs').renderFile)
app.set('views',[path.join(__dirname, 'views/index'),path.join(__dirname, 'views/admin')]);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use((req,res,next)=>{
  if(req.session.adminLogin){
     next()
  }else if(req.path == '/admin/login'){
    next()
  }else if(!req.path.includes('admin')){
    next()
  } else{
    res.redirect('/admin/login')
  }
 
})

app.use('/', indexRouter);
// app.use('/index', indexRouter);
app.use('/login', loginRouter);
app.use('/play', playRouter);
app.use('/movie', movieRouter);
// app.use('/users', usersRouter);

app.use('/',adminIndexRouter );
app.use('/admin',adminLoginRouter );
app.use('/admin/move',adminMoveRouter );
app.use('/admin',adminAddRouter );
app.use('/admin/ztlist',adminZtRouter );
app.use('/admin',adminZteditRouter );
app.use('/admin/hylist',adminHyRouter );
app.use('/admin',adminHyeditRouter );
app.use('/admin/glylist',adminGlyRouter );
app.use('/admin',adminGlyeditRouter );
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


