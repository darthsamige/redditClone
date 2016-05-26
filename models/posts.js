var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: {type:String},
  link: {type:String},
  upvotes: {type: Number, default:0},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comments'}]
});

PostSchema.methods.upvote= function(cb){
  this.upvotes += 1;
  this.save(cb);
};

module.exports = mongoose.model('Post', PostSchema);
