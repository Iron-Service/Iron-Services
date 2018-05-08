const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const shopSchema = new Schema({
  name: {type:String, required},
  direcction: {type:Schema.Types.ObjectId, ref:"Direction", required},
  description: String,
  date: [{type:Date}],
  serviceType:{type:String, required},
  serviceList: [{type:String, required}],
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
