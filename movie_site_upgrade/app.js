var express =require('express');

var port=process.env.PORT||3000;
var path=require('path');
var bodyParser = require('body-parser');
var fs=require('fs');

var mongoose=require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var dbUrl='mongodb://localhost/movie';
mongoose.connect(dbUrl);

//models loading
var models_path=__dirname+'/app/models';
var walk=function  (path) {
	fs
	.readdirSync(path)
	.forEach(function (file) {
		var newPath=path+'/'+file;
		var stat=fs.statSync(newPath);
		if(stat.isFile()){
			if(/(.*).(js|coffee)/.test(file)){
				require(newPath);
			}
		}else if(stat.isDirectory){
			walk(newPath);
		}
	})
}
walk(models_path);


var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var app=express();
app.set('views','./app/views/pages');
app.set('view engine','jade');

app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(require('connect-multiparty')());
app.use(cookieSession({
  secret:'imooc',
  store:new mongoStore({
  	url:dbUrl,
  	collection:'sessions'
  })
}));
var logger = require('morgan');
var env=process.env.NODE_ENV||'development';
if('development'===env){
	app.set('showStackError',true);
	app.use(logger(':method:url:status'));
	app.locals.pretty=true;
	mongoose.set('debug',true);
}
require('./config/routes')(app);
app.listen(port);

console.log('imooc start on port '+port);

