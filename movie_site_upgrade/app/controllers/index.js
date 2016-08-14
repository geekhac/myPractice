var Movie=require('../models/movie');
var Category=require('../models/category');
// index page
exports.page=function (req,res) {
	Category
	.find({})
	.populate({
		path:'movies',
		select:'title poster',
		options:{limit:6}
	})
	.exec(function (err,categories) {	
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'imooc 首页',
			categories:categories
		})
	})
}

exports.search=function (req,res) {
	var catId=req.query.cat;
	var count=2;
	var page=req.query.p||0;
	var index=page*count;
	var q=req.query.q;
	if(catId){
		Category
		.find({_id:catId})
		.populate({
			path:'movies',
			select:'title poster'
		})
		.exec(function (err,categories) {	
			if(err){
				console.log(err);
			}
			var category=categories[0]||{};
			var movies=category.movies||[];
			var results=movies.slice(index,index+count)
			res.render('results',{
				title:'imooc 结果列表页面',
				currentPage:(page+1),
				query:'cat='+category._id,
				totalPage:Math.ceil(movies.length/count),
				movies:results,
				keyword:category.name
			})
		})
	}else{
		Movie
		.find({title:new RegExp(q+'.*','i')})
		.exec(function (err,movies) {
			if(err){
				console.log(err);
			}
			var results=movies.slice(index,index+count)
			res.render('results',{
				title:'imooc 结果列表页面',
				currentPage:(page+1),
				query:'q='+q,
				totalPage:Math.ceil(movies.length/count),
				movies:results,
				keyword:q
			})
		})
	}
	
}