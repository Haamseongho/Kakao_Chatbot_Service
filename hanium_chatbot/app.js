var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var chatbot = require("./routes/chatbot");

var port = process.env.PORT || 2721;
//var dbUrl = "mongodb://hanium_frontier:123123@ds161630.mlab.com:61630/hanium_frontier";
//var MongoClient = require("mongodb").MongoClient;
var mongoose = require("mongoose");

var app = express();

var test = require("./routes/test");
var map = require("./routes/map");

// db
var mysql = require("mysql");
var connection = mysql.createConnection({
    host : 'helpdb.crqysrfu2n53.ap-northeast-2.rds.amazonaws.com',
    user : 'haams',
    password : 'abc123qw',
    database : 'helpDB',
    port : 3306,
    version : 1.0
});


connection.connect(function(err){
   if(err) throw err;
   else{
	console.log('db is connected well! - mysql');
   }
});


/*
  MongoClient.connect(dbUrl,function (err) {
        if(err) console.log("db is not connected");
        else{
            console.log("db is connected well");
        }
    });
*/
/*
mongoose.connect(dbUrl, function (err) {
    if (err) {
        return console.log("There is no database");
    }
    console.log("Database is connected well!");
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port',port);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/',chatbot);
app.use("/",test);
app.use("/",map);
// 지도 연동


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
var http = require("http");
var server = http.createServer(app);
server.listen(app.get('port'),function (err) {
    if(err) console.log("server is not running");
    else{
        console.log("server is running well" + " " + port);
    }
});


module.exports = app;
