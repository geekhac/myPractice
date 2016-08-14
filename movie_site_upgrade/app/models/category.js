var mongoose=require('mongoose');
var CategorySchema=require('../schemas/Category');
var Category=mongoose.model('Category',CategorySchema);

module.exports=Category;