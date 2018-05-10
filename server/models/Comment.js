const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  _author:{type:Schema.Types.ObjectId, ref:'User'},
  _shop: {type:Schema.Types.ObjectId, ref: "Shop"},
  content: {type:String, required:true},
  value: Number,
  evalueesPositive: [{type:Schema.Types.ObjectId, ref: "User"}],
  evalueesNegative: [{type:Schema.Types.ObjectId, ref: "User"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
