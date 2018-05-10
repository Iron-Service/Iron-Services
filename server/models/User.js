const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, required:true},
  password: {type:String, required:true},
  email:{type:String, required:true},
  directions:[ {type:Schema.Types.ObjectId, ref:"Direction"}],
  favorites: [String],
  messages:[{type:Schema.Types.ObjectId, ref:"Message"}],
  
  shop: {type:Boolean, default:false},
  shopsList: [{type:Schema.Types.ObjectId, ref:'Shop'}],  
  admin: {type:Boolean, default:false}
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
