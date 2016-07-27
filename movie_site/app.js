var express =require('express');

var port=process.env.PORT||3000;
var path=require('path');
var bodyParser = require('body-parser');
var _=require('underscore');


var mongoose=require('mongoose');
var Movie=require('./models/movie');
mongoose.connect('mongodb://localhost/movie')

var app=express();
app.set('views','./views/pages');
app.set('view engine','jade');

app.locals.moment = require('moment');
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static(path.join(__dirname,'public')))
app.listen(port);

console.log('imooc start on port '+port);

// index page
app.get('/',function (req,res) {
	Movie.fetch(function (err,movies) {
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'imooc 首页',
			movies:movies
		})
	});
})

// detial page
app.get('/movie/:id',function (req,res) {
	var id=req.params.id;

	Movie.findById(id,function (err,movie) {
		res.render('detail',{
			title:'imooc '+movie.title,
			movie: movie
		})
	})
	
})

// admin page
app.get('/admin/movie',function (req,res) {
	res.render('admin',{
		title:'imooc 后台录入页',
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
})


// admin update movie
app.get('/admin/update/:id',function (req,res) {
	var id=req.params.id;

	if(id){
		Movie.findById(id,function (err,movie) {
			res.render('admin',{
				title:'imooc 后台录入更新页',
				movie:movie
			})
		})
	}
})


// admin post movie
app.post('/admin/post/new',function (req,res) {
	 var movieObj = req.body.movie;
    var id = movieObj._id;
	var _movie;

	if(id!=='undefined'){
		Movie.findById(id,function(err,movie) {
			if(err){
				console.log(err);
			}

			_movie=_.extend(movie,movieObj);
			_movie.save(function (err,movie) {
				if(err){
					console.log(err);
				}
				res.redirect('/movie/'+movie.id);
			})
		})
	}else{
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})

		_movie.save(function (err,movie) {
			if(err){
				console.log(err);
			}
			res.redirect('/movie/'+movie._id);
		})
	}
})

// list page
app.get('/admin/list',function (req,res) {
	Movie.fetch(function (err,movies) {
		if(err){
			console.log(err+"没有"+movies);
		}
		res.render('list',{
			title:'imooc 列表页',
			movies:movies
		});
	});
	
})

// list delete movie
app.delete('/admin/list',function (req,res) {
	var id=req.query.id;

	if(id){
		Movie.remove({_id:id},function (err,movie) {
			if(err){
				console.log(err);
			}else{
				res.json({success:1});
			}
		})
	}
})
