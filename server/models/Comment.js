const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  author:{type:Schema.Types.ObjectId, ref:'User'},
  shop: {type:Schema.Types.ObjectId, ref: "Shop"},
  content: {type:String, required},
  positive: Number,
  negative: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', userSchema);
module.exports = Comment;
