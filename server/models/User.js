const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, required},
  password: {type:String, required},
  email:{type:String, required},
  direcctions:[ {type:Schema.Types.ObjectId, ref:"Direction"}],
  favorites: [String],
  comments: [{type:Schema.Types.ObjectId, ref:"Comment"}],
  appointments:[{type:Schema.Types.ObjectId, ref:"Appointments"}],
  complaints:[{type:Schema.Types.ObjectId, ref:'Complaint'}],
  messages: {type:Schema.Types.ObjectId, ref:"Message"},
  
  shop: Boolean,
  shopsList: [{type:Schema.Types.ObjectId, ref:'Shop'}],

  admin: Boolean
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
