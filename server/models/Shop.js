const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const shopSchema = new Schema({
  name: {type:String, required:true},
  direction: {type:Schema.Types.ObjectId, ref:"Direction", required:true},
  description: String,
  date: [{type:Date}],
  serviceType:{type:String, required:true},
  serviceList: [{type:String, required:true}],
  comments: [{type:Schema.Types.ObjectId, ref:"Comment"}],
  appointments:[{type:Schema.Types.ObjectId, ref:"Appointments"}],
  messages: {type:Schema.Types.ObjectId, ref:"Message"},
  positive: Number,
  negative: Number,
  numVisits: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Shop = mongoose.model('Shop', userSchema);
module.exports = Shop;
