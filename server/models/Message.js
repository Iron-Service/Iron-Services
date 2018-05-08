const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const messageSchema = new Schema({
    author:{type:Schema.Types.ObjectId, ref:'User'},
    shop: {type:Schema.Types.ObjectId, ref: "Shop"},
    title:String,
    content: String    
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
